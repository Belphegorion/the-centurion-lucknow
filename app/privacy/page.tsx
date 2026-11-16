import Link from "next/link";
import { siteConfig } from "@/data/site.config";
import { DrawLine } from "@/motion/DrawLine";

export default function PrivacyPage() {
  return (
    <div className="min-h-svh bg-obsidian text-ivory py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-10">
        <div>
          <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-2">
            Legal & Data Transparency
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ivory mb-4">
            Privacy Policy & Sample Disclosure
          </h1>
          <p className="text-smoke text-sm">
            Last Updated: November 2026 • The Centurion Restaurant and Lounge, Wave Mall Lucknow
          </p>
          <div className="w-24 mt-6">
            <DrawLine />
          </div>
        </div>

        <div className="space-y-6 text-sm text-smoke leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-ivory">
              1. Sample Website Notice
            </h2>
            <p>
              This website is an interactive demonstration showcase for The Centurion, situated at Wave Mall, 3rd Floor, Gomti Nagar, Lucknow. Verified business facts (address, hours, cuisines, core signature items, and amenities) are strictly documented. Unconfirmed prices, menus, and ratings are designated with a &quot;Sample&quot; badge and documented in the owner punch-list.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-ivory">
              2. Zero-Database Architecture & Data Privacy
            </h2>
            <p>
              This website does not store private guest information in an external database. When you initiate a reservation or event enquiry, your details are formatted client-side into a direct WhatsApp message link (<code className="text-gold">wa.me</code>) directed to our restaurant management (+91 91196 03535).
            </p>
            <p>
              Reservation preferences may be cached locally within your personal browser&apos;s <code className="text-gold">localStorage</code> strictly for autofill convenience on returning visits. You may clear your browser data at any time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-ivory">
              3. Analytics & Cookies
            </h2>
            <p>
              We do not utilize invasive tracking pixels or cross-site advertising cookies. Only anonymous, privacy-friendly telemetry or performance insights may be used to guarantee responsive mobile load speeds.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-ivory">
              4. Contact & Inquiries
            </h2>
            <p>
              For any questions regarding dining reservations, banquet catering, or data handling, reach our management directly:
            </p>
            <ul className="list-disc list-inside space-y-1 text-ivory">
              <li>Phone: {siteConfig.phone}</li>
              <li>WhatsApp: +91 91196 03535</li>
              <li>Address: {siteConfig.address.full}</li>
            </ul>
          </section>
        </div>

        <div className="pt-8 border-t border-white/10">
          <Link href="/" className="text-xs text-gold hover:underline font-cinzel uppercase tracking-wider">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
