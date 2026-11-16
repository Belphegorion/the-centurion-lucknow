import { siteConfig } from "@/data/site.config";
import { Reveal } from "@/motion/Reveal";
import { Icon } from "@/components/ui/Icon";

export function Visit() {
  const visitInfo = [
    {
      icon: "Clock" as const,
      title: "Operating Hours",
      detail: siteConfig.hours.display,
      subdetail: "Continuous dining through afternoon and evening",
    },
    {
      icon: "Car" as const,
      title: "Parking & Access",
      detail: "Wave Mall Basement & Dedicated Parking",
      subdetail: "Elevator access directly to 3rd floor from mall concourse",
    },
    {
      icon: "Users" as const,
      title: "Reservations Policy",
      detail: "Walk-ins Welcome • Bookings Advised",
      subdetail: "Priority seating guaranteed via WhatsApp reservation",
    },
    {
      icon: "CreditCard" as const,
      title: "Accepted Payments",
      detail: "UPI, Cards & Cash",
      subdetail: "All major credit cards and digital wallets accepted",
    },
  ];

  return (
    <section className="relative py-20 bg-obsidian text-ivory border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <Reveal>
            <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-2">
              Essential Details
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ivory">
              Planning Your Visit
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visitInfo.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.08}>
              <div className="p-6 rounded-card bg-charcoal/80 border border-white/5 hover:border-gold/30 transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full border border-gold/30 bg-obsidian flex items-center justify-center text-gold mb-4">
                    <Icon name={item.icon} size={18} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ivory mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gold font-medium mb-1">{item.detail}</p>
                </div>
                <p className="text-xs text-smoke leading-relaxed mt-2">{item.subdetail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
