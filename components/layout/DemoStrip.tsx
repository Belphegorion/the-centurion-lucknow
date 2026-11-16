import { siteConfig } from "@/data/site.config";

export function DemoStrip() {
  return (
    <aside
      aria-label="Demo announcement"
      className="relative z-40 w-full py-1.5 px-4 text-center bg-oxblood text-ivory text-xs font-body tracking-wider border-b border-gold/20 select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
        <span>
          <strong>Demo website</strong>, content is sample • Official reservations & enquiries via WhatsApp (+91 91196 03535)
        </span>
      </div>
    </aside>
  );
}
