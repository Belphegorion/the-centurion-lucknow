import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./motion/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "var(--color-obsidian)",
        charcoal: "var(--color-charcoal)",
        oxblood: {
          DEFAULT: "var(--color-oxblood)",
          subtle: "var(--color-oxblood-subtle)",
        },
        gold: {
          DEFAULT: "var(--color-gold)",
          light: "var(--color-gold-light)",
          champagne: "var(--color-champagne)",
        },
        ivory: {
          DEFAULT: "var(--color-ivory)",
          pure: "#FFFFFF",
        },
        smoke: {
          DEFAULT: "var(--color-smoke)",
          dark: "#5A544E",
        },
        status: {
          error: "var(--color-error)",
          success: "var(--color-success)",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        cinzel: ["var(--font-cinzel)", "Georgia", "serif"],
      },
      letterSpacing: {
        eyebrow: "0.28em",
        tightest: "-0.04em",
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.4)",
        glow: "0 0 35px -5px rgba(201, 162, 75, 0.15)",
        "glow-sm": "0 0 15px -3px rgba(201, 162, 75, 0.2)",
      },
      spacing: {
        "section-mobile": "80px",
        "section-desktop": "140px",
      },
    },
  },
  plugins: [],
};

export default config;
