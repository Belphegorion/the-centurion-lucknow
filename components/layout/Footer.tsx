import Link from "next/link";
import { siteConfig } from "@/data/site.config";
import { DrawLine } from "@/motion/DrawLine";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  return (
    <footer className="relative bg-charcoal text-ivory pt-16 pb-28 md:pb-16 border-t border-gold/25 safe-bottom">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
          {/* Column 1: Brand & Concept */}
          <div className="md:col-span-1">
            <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-1">
              The Gate • Top Floor
            </span>
            <h2 className="font-display text-3xl font-semibold text-ivory mb-3">
              {siteConfig.name}
            </h2>
            <p className="text-smoke text-sm leading-relaxed mb-4">
              Spacious fine dining, live interactive counters, and rooftop open-air lounge perched on the 3rd floor of Wave Mall.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`https://instagram.com/${siteConfig.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The Centurion Instagram"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-obsidian transition-colors"
              >
                <Icon name="Instagram" size={18} />
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The Centurion WhatsApp"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-obsidian transition-colors"
              >
                <Icon name="MessageSquare" size={18} />
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                aria-label="Call The Centurion"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-obsidian transition-colors"
              >
                <Icon name="Phone" size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Location & Directions */}
          <div>
            <h3 className="font-cinzel text-xs tracking-eyebrow text-gold uppercase mb-4">
              Location
            </h3>
            <p className="text-sm text-ivory font-medium mb-1">Wave Mall, 3rd Floor (Top Floor)</p>
            <p className="text-sm text-smoke leading-relaxed mb-3">
              Vibhuti Khand, Gomti Nagar,<br />
              Lucknow, Uttar Pradesh 226010<br />
              <span className="text-gold/90 text-xs">(Near Polytechnic Crossing)</span>
            </p>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gold hover:underline font-medium"
            >
              <Icon name="MapPin" size={14} />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Column 3: Hours & Service */}
          <div>
            <h3 className="font-cinzel text-xs tracking-eyebrow text-gold uppercase mb-4">
              Hours & Service
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-ivory font-medium">Daily Service</p>
                <p className="text-smoke">12:00 PM to 11:30 PM (IST)</p>
              </div>
              <div>
                <p className="text-ivory font-medium">Buffet & Live Counters</p>
                <p className="text-smoke">Lunch & Evening Spreads</p>
              </div>
              <div>
                <p className="text-ivory font-medium">Children’s Play Area</p>
                <p className="text-smoke">Open Daily with Caretaker</p>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Links & Reservations */}
          <div>
            <h3 className="font-cinzel text-xs tracking-eyebrow text-gold uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-smoke">
              <li>
                <Link href="/menu" className="hover:text-gold transition-colors">
                  Explore Full Menu
                </Link>
              </li>
              <li>
                <Link href="/reserve" className="hover:text-gold transition-colors">
                  Reserve a Table
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-gold transition-colors">
                  Parties & Large Groups (10+)
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gold transition-colors">
                  Privacy Policy & Sample Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <DrawLine />

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-smoke">
          <p>© {new Date().getFullYear()} The Centurion. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Verified business facts only. Unconfirmed items marked <span className="text-gold font-semibold">Sample</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
