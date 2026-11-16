import { ReservationPayload } from "./whatsapp";
import { siteConfig } from "@/data/site.config";

export function generateIcsContent(res: ReservationPayload): string {
  // Parse date and time into YYYYMMDDTHHMMSS format
  // Assume date format is YYYY-MM-DD or readable
  let dateObj = new Date();
  try {
    const parsed = new Date(res.date);
    if (!isNaN(parsed.getTime())) {
      dateObj = parsed;
    }
  } catch {
    // fallback
  }

  // Parse time e.g. "07:30 PM"
  const [timeStr, meridiem] = res.time.split(" ");
  const [hStr, mStr] = timeStr.split(":");
  let hour = parseInt(hStr, 10);
  const minute = parseInt(mStr, 10);
  if (meridiem === "PM" && hour < 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;

  dateObj.setHours(hour, minute, 0, 0);

  // Format to UTC string for ICS
  const pad = (n: number) => String(n).padStart(2, "0");
  const year = dateObj.getFullYear();
  const month = pad(dateObj.getMonth() + 1);
  const day = pad(dateObj.getDate());
  const hours = pad(dateObj.getHours());
  const minutes = pad(dateObj.getMinutes());

  const startTimestamp = `${year}${month}${day}T${hours}${minutes}00`;

  // End time: +2 hours
  const endObj = new Date(dateObj.getTime() + 2 * 60 * 60 * 1000);
  const endYear = endObj.getFullYear();
  const endMonth = pad(endObj.getMonth() + 1);
  const endDay = pad(endObj.getDate());
  const endHours = pad(endObj.getHours());
  const endMinutes = pad(endObj.getMinutes());
  const endTimestamp = `${endYear}${endMonth}${endDay}T${endHours}${endMinutes}00`;

  const nowStamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Centurion Lucknow//Reservation System//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:centurion-${Date.now()}@thecenturionlucknow.com`,
    `DTSTAMP:${nowStamp}`,
    `DTSTART:${startTimestamp}`,
    `DTEND:${endTimestamp}`,
    `SUMMARY:Table Reservation at The Centurion (${res.guests} Guests)`,
    `DESCRIPTION:Reservation for ${res.name} (${res.guests} guests) at The Centurion.\\nSeating: ${res.seating}\\nOccasion: ${res.occasion}\\nPhone: ${siteConfig.phone}`,
    `LOCATION:${siteConfig.address.full}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadReservationIcs(res: ReservationPayload): void {
  if (typeof window === "undefined") return;

  const icsData = generateIcsContent(res);
  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `The-Centurion-Reservation-${res.date}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
