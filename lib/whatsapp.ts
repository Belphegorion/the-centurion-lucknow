import { siteConfig } from "@/data/site.config";

export interface ReservationPayload {
  date: string;
  time: string;
  guests: number;
  seating: "Indoor" | "Rooftop";
  occasion: string;
  nearPlayArea: boolean;
  name: string;
  phone: string;
  notes?: string;
}

export function buildWhatsAppReservationUrl(data: ReservationPayload): string {
  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");

  const lines = [
    `*Table Reservation Request — The Centurion*`,
    `Wave Mall, 3rd Floor, Gomti Nagar, Lucknow`,
    ``,
    `👤 *Guest Name:* ${data.name.trim()}`,
    `📞 *Contact:* ${data.phone.trim()}`,
    `📅 *Date:* ${data.date}`,
    `⏰ *Time Slot:* ${data.time}`,
    `👥 *Guests:* ${data.guests} person${data.guests > 1 ? "s" : ""}`,
    `🪑 *Seating Preference:* ${data.seating}`,
    `🎉 *Occasion:* ${data.occasion}`,
    `🧸 *Near Play Area:* ${data.nearPlayArea ? "Yes, please" : "No preference"}`,
  ];

  if (data.notes && data.notes.trim().length > 0) {
    lines.push(`📝 *Special Requests:* ${data.notes.trim()}`);
  }

  lines.push(``);
  lines.push(`_Sent via thecenturionlucknow.com reservation portal_`);

  const message = lines.join("\n");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppBuffetEnquiryUrl(): string {
  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");
  const message = [
    `*Buffet Rate & Live Counters Enquiry*`,
    `Hello The Centurion team, I'd like to ask about today's buffet rates, live counter spread, and current offers for lunch/dinner.`,
  ].join("\n");

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppEventEnquiryUrl(details: {
  eventType: string;
  guests: number;
  date: string;
  name: string;
  phone: string;
  notes?: string;
}): string {
  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");
  const lines = [
    `*Celebration / Large Group Gathering Enquiry*`,
    `The Centurion Restaurant & Lounge (Wave Mall, Lucknow)`,
    ``,
    `👤 *Organizer:* ${details.name.trim()}`,
    `📞 *Phone:* ${details.phone.trim()}`,
    `🎊 *Event Type:* ${details.eventType}`,
    `👥 *Estimated Guests:* ${details.guests}`,
    `📅 *Preferred Date:* ${details.date}`,
  ];

  if (details.notes) {
    lines.push(`📝 *Requirements:* ${details.notes}`);
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
}
