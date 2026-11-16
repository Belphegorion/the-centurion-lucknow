"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { siteConfig } from "@/data/site.config";
import { standardTimeSlots, isSlotPastForToday } from "@/lib/time";
import { buildWhatsAppReservationUrl, ReservationPayload } from "@/lib/whatsapp";
import { downloadReservationIcs } from "@/lib/ics";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { DrawLine } from "@/motion/DrawLine";
import { t } from "@/motion/tokens";
import { usePerformanceTier } from "@/motion/hooks/usePerformanceTier";

const occasions = [
  "Family Lunch / Dinner",
  "Birthday Celebration",
  "Romantic Date",
  "Corporate Gathering",
  "Kitty Party",
  "Casual Dining",
];

// Zod Schema for details step
const detailsSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z
    .string()
    .min(10, "Please enter a valid 10-digit mobile number")
    .regex(/^[0-9+ -]{10,15}$/, "Invalid phone format"),
  notes: z.string().optional(),
});

export default function ReservePage() {
  const tier = usePerformanceTier();

  // Current Step: 1 (When), 2 (Who), 3 (Details), 4 (Confirmed)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  // Form State
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("07:30 PM");
  const [guests, setGuests] = useState<number>(2);
  const [seating, setSeating] = useState<"Indoor" | "Rooftop">("Indoor");
  const [occasion, setOccasion] = useState<string>("Family Lunch / Dinner");
  const [nearPlayArea, setNearPlayArea] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Validation Errors & Shake trigger
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [shake, setShake] = useState(false);

  // Stored Last Request
  const [lastRequest, setLastRequest] = useState<ReservationPayload | null>(null);

  // Generate next 14 dates
  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().split("T")[0];
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = d.getDate();
    const month = d.toLocaleDateString("en-US", { month: "short" });
    return { iso, dayName, dayNum, month, isToday: i === 0 };
  });

  useEffect(() => {
    // Default to today
    if (availableDates[0]) {
      setSelectedDate(availableDates[0].iso);
    }
    // Load last request from localStorage
    try {
      const saved = localStorage.getItem("centurion-last-reservation");
      if (saved) {
        setLastRequest(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const goToNextStep = () => {
    if (step === 1) {
      if (!selectedDate || !selectedTime) return;
      setSlideDirection(1);
      setStep(2);
    } else if (step === 2) {
      setSlideDirection(1);
      setStep(3);
    } else if (step === 3) {
      // Validate with Zod
      const result = detailsSchema.safeParse({ name, phone, notes });
      if (!result.success) {
        const fieldErrors: { name?: string; phone?: string } = {};
        result.error.errors.forEach((err) => {
          if (err.path[0] === "name") fieldErrors.name = err.message;
          if (err.path[0] === "phone") fieldErrors.phone = err.message;
        });
        setErrors(fieldErrors);
        setShake(true);
        setTimeout(() => setShake(false), 500);
        return;
      }

      setErrors({});

      // Build payload
      const payload: ReservationPayload = {
        date: selectedDate,
        time: selectedTime,
        guests,
        seating,
        occasion,
        nearPlayArea,
        name,
        phone,
        notes,
      };

      // Save to localStorage
      try {
        localStorage.setItem("centurion-last-reservation", JSON.stringify(payload));
        setLastRequest(payload);
      } catch {
        // ignore
      }

      // Haptic feedback
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(10);
      }

      // Open WhatsApp reservation URL
      const waUrl = buildWhatsAppReservationUrl(payload);
      window.open(waUrl, "_blank");

      // Optional serverless API trigger in parallel
      fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Site works fully without backend
      });

      setSlideDirection(1);
      setStep(4);
    }
  };

  const goToPrevStep = () => {
    if (step > 1 && step < 4) {
      setSlideDirection(-1);
      setStep((step - 1) as 1 | 2 | 3);
    }
  };

  const isToday = selectedDate === availableDates[0]?.iso;

  return (
    <div className="min-h-svh bg-obsidian text-ivory py-12 md:py-20 safe-bottom">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-2">
            Table Reservations
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ivory mb-3">
            Reserve Your Table
          </h1>
          <p className="text-smoke text-sm">
            Instant booking directly confirmed via WhatsApp • Zero advance fees
          </p>
          <div className="w-24 mx-auto mt-5">
            <DrawLine />
          </div>
        </div>

        {/* Previous Request Quick Recall */}
        {lastRequest && step !== 4 && (
          <div className="mb-6 p-3 px-4 rounded-lg bg-charcoal/70 border border-gold/20 flex items-center justify-between text-xs text-smoke">
            <span>
              Previous request: <strong>{lastRequest.name}</strong> ({lastRequest.guests} guests on {lastRequest.date})
            </span>
            <button
              type="button"
              onClick={() => {
                setName(lastRequest.name);
                setPhone(lastRequest.phone);
                setGuests(lastRequest.guests);
                setSeating(lastRequest.seating);
              }}
              className="text-gold font-semibold hover:underline"
            >
              Autofill
            </button>
          </div>
        )}

        {/* Step Progress Hairline */}
        {step < 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-cinzel tracking-wider text-smoke uppercase mb-2">
              <span className={step >= 1 ? "text-gold font-semibold" : ""}>1. When</span>
              <span className={step >= 2 ? "text-gold font-semibold" : ""}>2. Who & Where</span>
              <span className={step >= 3 ? "text-gold font-semibold" : ""}>3. Guest Details</span>
            </div>
            <div className="h-[2px] w-full bg-charcoal rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gold shadow-glow-sm"
                initial={false}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.35, ease: t.ease }}
              />
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="relative rounded-card bg-charcoal border border-gold/30 p-6 sm:p-10 shadow-card">
          <AnimatePresence mode="wait" custom={slideDirection}>
            {/* STEP 1: WHEN */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={slideDirection}
                initial={{ opacity: 0, x: slideDirection * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -slideDirection * 24 }}
                transition={{ duration: 0.3, ease: t.ease }}
                className="space-y-8"
              >
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ivory mb-1">
                    Select Date
                  </h2>
                  <p className="text-smoke text-xs mb-4">Reservations open 14 days in advance</p>

                  {/* Horizontal Date Picker Strip */}
                  <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2">
                    {availableDates.map((item) => {
                      const isSelected = selectedDate === item.iso;
                      return (
                        <button
                          key={item.iso}
                          type="button"
                          onClick={() => setSelectedDate(item.iso)}
                          className={`min-w-[70px] py-3 px-2 rounded-card border flex flex-col items-center justify-center transition-all ${
                            isSelected
                              ? "bg-gold text-obsidian border-gold shadow-glow-sm font-semibold"
                              : "bg-obsidian/70 border-white/10 text-ivory hover:border-gold/40"
                          }`}
                        >
                          <span className="text-[11px] uppercase tracking-wider font-cinzel">
                            {item.dayName}
                          </span>
                          <span className="text-xl font-display font-semibold my-0.5">
                            {item.dayNum}
                          </span>
                          <span className="text-[10px] opacity-80">{item.month}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-semibold text-ivory mb-1">
                    Select Time Slot (IST)
                  </h2>
                  <p className="text-smoke text-xs mb-4">
                    Daily service 12:00 PM – 11:30 PM (last seating 10:30 PM)
                  </p>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {standardTimeSlots.map((slot) => {
                      const isSelected = selectedTime === slot;
                      const isPast = isToday && isSlotPastForToday(slot);

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isPast}
                          onClick={() => setSelectedTime(slot)}
                          className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-medium tracking-wide transition-all ${
                            isPast
                              ? "opacity-30 cursor-not-allowed bg-obsidian text-smoke border border-transparent"
                              : isSelected
                              ? "bg-gold text-obsidian border-gold font-semibold shadow-glow-sm"
                              : "bg-obsidian/70 border border-white/10 text-ivory hover:border-gold/40"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <Button
                    size="md"
                    variant="primary"
                    onClick={goToNextStep}
                    icon={<Icon name="ArrowRight" size={16} />}
                    iconPosition="right"
                  >
                    Continue to Guests & Seating
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: WHO & WHERE */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={slideDirection}
                initial={{ opacity: 0, x: slideDirection * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -slideDirection * 24 }}
                transition={{ duration: 0.3, ease: t.ease }}
                className="space-y-8"
              >
                {/* Guest Count Stepper */}
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ivory mb-1">
                    Number of Guests
                  </h2>
                  <p className="text-smoke text-xs mb-4">
                    For groups of {siteConfig.largeGroupFrom} or more, we arrange bespoke party dining.
                  </p>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                      aria-label="Decrease guest count"
                      className="w-12 h-12 rounded-full border border-gold/40 bg-obsidian flex items-center justify-center text-gold hover:bg-gold hover:text-obsidian disabled:opacity-30 disabled:cursor-not-allowed text-xl font-semibold"
                    >
                      -
                    </button>

                    <div className="w-24 text-center">
                      <span className="font-display text-4xl font-semibold text-ivory tabular-nums">
                        {guests}
                      </span>
                      <span className="block text-[11px] text-smoke font-cinzel uppercase">
                        {guests === 1 ? "Guest" : "Guests"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(30, guests + 1))}
                      disabled={guests >= 30}
                      aria-label="Increase guest count"
                      className="w-12 h-12 rounded-full border border-gold/40 bg-obsidian flex items-center justify-center text-gold hover:bg-gold hover:text-obsidian disabled:opacity-30 disabled:cursor-not-allowed text-xl font-semibold"
                    >
                      +
                    </button>
                  </div>

                  {guests >= siteConfig.largeGroupFrom && (
                    <div className="mt-4 p-3 rounded-lg bg-oxblood/40 border border-gold/30 text-xs text-champagne flex items-center gap-2">
                      <Icon name="Users" size={16} className="shrink-0 text-gold" />
                      <span>
                        Large party ({guests} guests): Our banquet team will connect with you to review seating layouts and customized buffet arrangements.
                      </span>
                    </div>
                  )}
                </div>

                {/* Seating Preference */}
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ivory mb-3">
                    Seating Preference
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {(["Indoor", "Rooftop"] as const).map((seat) => (
                      <button
                        key={seat}
                        type="button"
                        onClick={() => setSeating(seat)}
                        className={`min-h-[50px] p-4 rounded-card border flex items-center justify-between text-left transition-all ${
                          seating === seat
                            ? "bg-gold text-obsidian border-gold font-semibold shadow-glow-sm"
                            : "bg-obsidian/70 border-white/10 text-ivory hover:border-gold/40"
                        }`}
                      >
                        <div>
                          <span className="block font-display text-lg">{seat}</span>
                          <span className="text-[11px] opacity-80">
                            {seat === "Indoor" ? "Main Dining Hall & Ac" : "Skyline Open Deck"}
                          </span>
                        </div>
                        {seating === seat && <Icon name="Check" size={18} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Occasion */}
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ivory mb-3">
                    Special Occasion
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {occasions.map((occ) => (
                      <button
                        key={occ}
                        type="button"
                        onClick={() => setOccasion(occ)}
                        className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          occasion === occ
                            ? "bg-gold text-obsidian border-gold font-semibold"
                            : "bg-obsidian/70 border-white/10 text-ivory hover:border-gold/40"
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Near Play Area Toggle */}
                <div className="flex items-center justify-between p-4 rounded-card bg-obsidian/80 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Icon name="Baby" size={20} className="text-gold" />
                    <div>
                      <p className="text-sm font-medium text-ivory">Table Near Play Area</p>
                      <p className="text-xs text-smoke">Keep an eye on children while dining</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={nearPlayArea}
                    onChange={(e) => setNearPlayArea(e.target.checked)}
                    className="w-5 h-5 accent-gold cursor-pointer"
                  />
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Button size="md" variant="ghost" onClick={goToPrevStep}>
                    Back
                  </Button>
                  <Button size="md" variant="primary" onClick={goToNextStep}>
                    Continue to Contact Details
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: GUEST DETAILS */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={slideDirection}
                initial={{ opacity: 0, x: slideDirection * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -slideDirection * 24 }}
                transition={{ duration: 0.3, ease: t.ease }}
                className={`space-y-6 ${shake ? "animate-shake" : ""}`}
              >
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ivory mb-1">
                    Contact Details
                  </h2>
                  <p className="text-smoke text-xs">
                    We will send your table confirmation directly to WhatsApp.
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-cinzel tracking-wider text-gold uppercase mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aditi Sharma"
                    className={`w-full min-h-[48px] px-4 py-2.5 rounded-[10px] bg-obsidian border text-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold ${
                      errors.name ? "border-status-error" : "border-white/15"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-status-error text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-cinzel tracking-wider text-gold uppercase mb-1.5">
                    WhatsApp Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full min-h-[48px] px-4 py-2.5 rounded-[10px] bg-obsidian border text-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold ${
                      errors.phone ? "border-status-error" : "border-white/15"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-status-error text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-cinzel tracking-wider text-gold uppercase mb-1.5">
                    Special Requests / Dietary Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Jain food preferences, high chair needed, anniversary cake..."
                    className="w-full px-4 py-2.5 rounded-[10px] bg-obsidian border border-white/15 text-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                {/* Booking Recap */}
                <div className="p-4 rounded-[10px] bg-obsidian/60 border border-gold/20 text-xs space-y-1 text-smoke">
                  <p>
                    <strong className="text-ivory">Reservation Summary:</strong> {guests} Guests • {selectedDate} at {selectedTime}
                  </p>
                  <p>
                    <strong className="text-ivory">Preference:</strong> {seating} Seating • {occasion}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Button size="md" variant="ghost" onClick={goToPrevStep}>
                    Back
                  </Button>
                  <Button
                    size="lg"
                    variant="primary"
                    onClick={goToNextStep}
                    icon={<Icon name="MessageSquare" size={18} />}
                  >
                    Confirm via WhatsApp
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: CONFIRMATION & CALENDAR ICS */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: t.ease }}
                className="text-center py-6 space-y-6"
              >
                {/* Gold Success Ring Drawn via SVG */}
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#C9A24B"
                      strokeWidth="3"
                      strokeDasharray="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 0.8, ease: t.ease }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-gold">
                    <Icon name="Check" size={32} />
                  </div>
                </div>

                <div>
                  <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-1">
                    Request Transmitted
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ivory mb-2">
                    Table Reserved for {name}
                  </h2>
                  <p className="text-smoke text-sm max-w-md mx-auto leading-relaxed">
                    We have opened your pre-filled WhatsApp message. Your table is confirmed as soon as our reservation manager replies.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="max-w-md mx-auto p-5 rounded-card bg-obsidian border border-gold/30 text-left space-y-2 text-sm shadow-card">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-smoke">Diner</span>
                    <span className="text-ivory font-medium">{name}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-smoke">Party Size</span>
                    <span className="text-ivory font-medium">{guests} Guests</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-smoke">Date & Time</span>
                    <span className="text-gold font-medium">{selectedDate} • {selectedTime}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-smoke">Seating</span>
                    <span className="text-ivory font-medium">{seating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-smoke">Location</span>
                    <span className="text-ivory font-medium">Wave Mall, 3rd Floor</span>
                  </div>
                </div>

                {/* Calendar & Share Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() =>
                      downloadReservationIcs({
                        date: selectedDate,
                        time: selectedTime,
                        guests,
                        seating,
                        occasion,
                        nearPlayArea,
                        name,
                        phone,
                        notes,
                      })
                    }
                    icon={<Icon name="CalendarPlus" size={16} />}
                  >
                    Add to Calendar (.ics)
                  </Button>

                  <a
                    href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      variant="ghost"
                      size="md"
                      icon={<Icon name="Phone" size={16} />}
                    >
                      Call Front Desk Instead
                    </Button>
                  </a>
                </div>

                <div className="pt-6">
                  <Link href="/" className="text-xs text-gold hover:underline font-cinzel uppercase tracking-wider">
                    ← Return to Home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
