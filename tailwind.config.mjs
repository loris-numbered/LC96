import fluidLayout from "@numbered/tailwind-fluid-layout-system";

const SIZES = [11, 12, 13, 14, 16, 18, 20, 24, 28, 32, 40, 48, 60, 80, 100, 120, 200];
const fontSize = Object.fromEntries(SIZES.map((size) => [size, `${size / 16}rem`]));
const fontFamily = {
  sans: ['"PP Neue Montreal"', '"Geist Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
  serif: ["Ogg", '"Geist Variable"', "ui-serif", "Georgia", "serif"],
  mono: ['"Geist Variable"', "ui-monospace", "monospace"],
};

const letterSpacing = {
  tighter: "-0.04em",
  tight: "-0.02em",
  normal: "0",
  wide: "0.02em",
  wider: "0.04em",
};

const lineHeight = {
  none: "1",
  narrow: "0.9",
  tight: "1.1",
  snug: "1.2",
  normal: "1.6",
  relaxed: "1.8",
};

export default {
  theme: {
    fontSize,
    fontFamily,
    letterSpacing,
    lineHeight,
    grid: {
      mobile: { columns: 12, gutter: 8, margin: 16, mockupWidth: 375 },
      tablet: { columns: 12, gutter: 12, margin: 24, mockupWidth: 768, screen: "md" },
      desktop: { columns: 12, gutter: 12, margin: 24, mockupWidth: 1440, fontScalingMaxWidth: 1536, screen: "lg" },
    },
  },
  plugins: [fluidLayout({ guidelines: false })],
};
