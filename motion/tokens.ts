export const t = {
  ease: [0.22, 1, 0.36, 1] as const,
  dur: {
    micro: 0.2,
    base: 0.45,
    slow: 0.7,
    image: 0.95,
  },
  stagger: 0.07,
};

export const spring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
};

export const tapScale = {
  scale: 0.97,
  transition: { duration: 0.12, ease: t.ease },
};

export const viewportConfig = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -10% 0px",
};

export const fadeUp = (d = 16) => ({
  hidden: { opacity: 0, y: d },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: t.dur.base,
      ease: t.ease,
    },
  },
});

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: t.dur.base,
      ease: t.ease,
    },
  },
};

export const staggerContainer = (staggerDelay = t.stagger) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});
