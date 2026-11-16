"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site.config";
import { buildWhatsAppEventEnquiryUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { DrawLine } from "@/motion/DrawLine";

const eventTypes = [
  "Birthday Celebration",
  "Anniversary Banquet",
  "Corporate Lunch / Dinner",
  "Kitty Party",
  "Family Reunion",
  "Rooftop Cocktail Reception",
];

export default function EventsPage() {
  const [eventType, setEventType] = useState("Birthday Celebration");
  const [guests, setGuests] = useState(15);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date) {
      alert("Please enter your name, contact phone, and preferred date.");
      return;
    }

    const waUrl = buildWhatsAppEventEnquiryUrl({
      eventType,
      guests,
      date,
      name,
      phone,
      notes,
    });

    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-svh bg-obsidian text-ivory py-12 md:py-20 safe-bottom">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-2">
            Private Celebrations & Banquets
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ivory mb-3">
            Host Your Event
          </h1>
          <p className="text-smoke text-sm">
            Accommodating groups from {siteConfig.largeGroupFrom} up to 180 guests in the Grand Dining Hall and Skyline Rooftop.
          </p>
          <div className="w-24 mx-auto mt-5">
            <DrawLine />
          </div>
        </div>

        <div className="rounded-card bg-charcoal border border-gold/30 p-6 sm:p-10 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Type */}
            <div>
              <label className="block text-xs font-cinzel tracking-wider text-gold uppercase mb-2">
                Event Category
              </label>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEventType(type)}
                    className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      eventType === type
                        ? "bg-gold text-obsidian border-gold font-semibold"
                        : "bg-obsidian/70 border-white/10 text-ivory hover:border-gold/40"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Guests */}
            <div>
              <label className="block text-xs font-cinzel tracking-wider text-gold uppercase mb-1.5">
                Estimated Number of Guests ({guests} Guests)
              </label>
              <input
                type="range"
                min="10"
                max="180"
                step="5"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                className="w-full accent-gold cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-smoke mt-1 font-cinzel">
                <span>10 Guests</span>
                <span>50 Guests</span>
                <span>100 Guests</span>
                <span>180+ Guests</span>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-cinzel tracking-wider text-gold uppercase mb-1.5">
                Preferred Event Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-[10px] bg-obsidian border border-white/15 text-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-cinzel tracking-wider text-gold uppercase mb-1.5">
                  Host Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikramaditya"
                  className="w-full min-h-[48px] px-4 py-2.5 rounded-[10px] bg-obsidian border border-white/15 text-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel tracking-wider text-gold uppercase mb-1.5">
                  WhatsApp Contact *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full min-h-[48px] px-4 py-2.5 rounded-[10px] bg-obsidian border border-white/15 text-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-xs font-cinzel tracking-wider text-gold uppercase mb-1.5">
                Catering & Decor Requests
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Live music preference, customized cake, private buffet counter setup..."
                className="w-full px-4 py-2.5 rounded-[10px] bg-obsidian border border-white/15 text-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-smoke">
                Direct WhatsApp routing to event coordinator
              </span>
              <Button
                type="submit"
                size="lg"
                variant="primary"
                icon={<Icon name="MessageSquare" size={18} />}
              >
                Inquire via WhatsApp
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


