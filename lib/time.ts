export interface ISTStatus {
  isOpen: boolean;
  text: string;
  subtext: string;
  currentTimeIST: string;
}

export function getISTStatus(): ISTStatus {
  try {
    const now = new Date();
    const istString = now.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "numeric",
      minute: "numeric",
    });

    const [hourStr, minStr] = istString.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minStr, 10);
    const currentMinutes = hour * 60 + minute;

    const openMinutes = 12 * 60; // 12:00 PM = 720
    const closeMinutes = 23 * 60 + 30; // 11:30 PM = 1410

    const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

    if (isOpen) {
      return {
        isOpen: true,
        text: "Open now",
        subtext: "Closes 11:30 PM",
        currentTimeIST: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
      };
    } else {
      return {
        isOpen: false,
        text: "Closed",
        subtext: "Opens 12:00 PM",
        currentTimeIST: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
      };
    }
  } catch {
    return {
      isOpen: true,
      text: "Open daily",
      subtext: "12:00 PM – 11:30 PM",
      currentTimeIST: "12:00",
    };
  }
}

// 30-minute reservation slots between 12:00 PM and 10:30 PM (last seating)
export const standardTimeSlots = [
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
  "10:00 PM",
  "10:30 PM",
];

export function isSlotPastForToday(slot: string): boolean {
  try {
    const now = new Date();
    const istString = now.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "numeric",
      minute: "numeric",
    });

    const [curHourStr, curMinStr] = istString.split(":");
    const curMinutes = parseInt(curHourStr, 10) * 60 + parseInt(curMinStr, 10);

    // Convert slot e.g. "01:30 PM" to minutes
    const [time, meridiem] = slot.split(" ");
    const [hStr, mStr] = time.split(":");
    let h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    if (meridiem === "PM" && h < 12) h += 12;
    if (meridiem === "AM" && h === 12) h = 0;
    const slotMinutes = h * 60 + m;

    // Buffer 30 minutes in advance
    return slotMinutes <= curMinutes + 30;
  } catch {
    return false;
  }
}
