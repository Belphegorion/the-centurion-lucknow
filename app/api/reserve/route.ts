import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { buildWhatsAppReservationUrl, ReservationPayload } from "@/lib/whatsapp";

export const runtime = "nodejs";

const reserveRequestSchema = z.object({
  date: z.string().min(1),
  time: z.string().min(1),
  guests: z.number().int().min(1).max(100),
  seating: z.enum(["Indoor", "Rooftop"]),
  occasion: z.string(),
  nearPlayArea: z.boolean(),
  name: z.string().min(2),
  phone: z.string().min(10),
  notes: z.string().optional(),
  // Honeypot field for bot prevention: must be empty
  website_field_hp: z.string().optional(),
});

// Simple in-memory IP rate limiter (best effort serverless)
const ipRequestMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
    const now = Date.now();

    // Check rate limit: max 5 requests per 60 seconds per IP
    const rateData = ipRequestMap.get(ip);
    if (rateData && now - rateData.timestamp < 60000) {
      if (rateData.count >= 5) {
        return NextResponse.json(
          { error: "Too many requests. Please try again shortly." },
          { status: 429 }
        );
      }
      rateData.count += 1;
    } else {
      ipRequestMap.set(ip, { count: 1, timestamp: now });
    }

    const body = await req.json();

    // Check honeypot
    if (body.website_field_hp && body.website_field_hp.length > 0) {
      return NextResponse.json({ status: "ignored" });
    }

    const parsed = reserveRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid booking data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data: ReservationPayload = parsed.data;
    const whatsappUrl = buildWhatsAppReservationUrl(data);

    // Optional email dispatch via Resend if RESEND_API_KEY and RESERVATION_TO_EMAIL exist
    let emailSent = false;
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.RESERVATION_TO_EMAIL;

    if (resendKey && toEmail) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "The Centurion Reservations <reservations@thecenturionlucknow.com>",
            to: [toEmail],
            subject: `New Reservation Request: ${data.name} (${data.guests} Guests) - ${data.date}`,
            text: `New Reservation Request for The Centurion:\\n\\nName: ${data.name}\\nPhone: ${data.phone}\\nDate: ${data.date}\\nTime: ${data.time}\\nGuests: ${data.guests}\\nSeating: ${data.seating}\\nOccasion: ${data.occasion}\\nNear Play Area: ${data.nearPlayArea ? "Yes" : "No"}\\nNotes: ${data.notes || "None"}`,
          }),
        });
        emailSent = true;
      } catch (err) {
        console.warn("Failed to dispatch Resend email notification:", err);
      }
    }

    return NextResponse.json({
      success: true,
      whatsappUrl,
      emailSent,
    });
  } catch (error) {
    console.error("Reservation API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
