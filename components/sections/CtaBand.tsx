import Link from "next/link";
import { siteConfig } from "@/data/site.config";
import { Reveal } from "@/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function CtaBand() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-charcoal via-oxblood-subtle to-obsidian text-ivory border-t border-gold/30 chikankari-pattern">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-6">
        <Reveal>
          <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block">
            Reserve Your Experience
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold text-ivory tracking-tightest leading-tight">
            Step Beyond The Arch
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-smoke text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Whether for a lavish lunch buffet, an evening gathering on the rooftop deck, or a family birthday celebration near the play area—we look forward to welcoming you.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/reserve" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="primary"
                isFullWidth
                icon={<Icon name="Calendar" size={18} />}
              >
                Book a Table Now
              </Button>
            </Link>

            <Link href="/events" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                isFullWidth
                icon={<Icon name="PartyPopper" size={18} />}
              >
                Inquire for Groups (10+)
              </Button>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="text-xs text-smoke font-body pt-4">
            Direct WhatsApp confirmation • No advance deposits • Wave Mall, 3rd Floor, Gomti Nagar
          </p>
        </Reveal>
      </div>
    </section>
  );
}
