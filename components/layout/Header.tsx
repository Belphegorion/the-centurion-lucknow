"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site.config";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/reserve", label: "Reserve" },
  { href: "/events", label: "Events & Groups" },
  { href: "/#find-us", label: "Find Us" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-obsidian/95 border-b border-gold/25 shadow-card backdrop-blur-md py-2.5"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Wordmark in Cinzel with 0.28em letter spacing */}
          <Link
            href="/"
            className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
          >
            <span className="font-cinzel text-xs tracking-eyebrow text-gold group-hover:text-gold-light transition-colors uppercase">
              The Gate • 3rd Floor
            </span>
            <span className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ivory group-hover:text-gold transition-colors">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative py-1 text-sm font-body tracking-wider text-ivory/80 hover:text-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="header-active-nav"
                      className="absolute inset-x-0 -bottom-1 h-[2px] bg-gold shadow-glow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link href="/reserve">
              <Button size="sm" variant="primary">
                Reserve Table
              </Button>
            </Link>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2.5">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="min-w-[44px] min-h-[44px] p-2 flex items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Icon name="Menu" size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Height Mobile Navigation Sheet */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
