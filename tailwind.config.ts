import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#101114",
        surface: "#1B1D22",
        surfacehi: "#22252C",
        line: "#2A2D34",
        ink: "#EDEAE3",
        muted: "#8B8F98",
        brass: "#C9A227",
        brasshi: "#E6BE4A",
        common: "#9AA0A8",
        uncommon: "#4FB477",
        rare: "#4C8DFF",
        epic: "#A64CFF",
        legendary: "#C9A227",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 20% 20%, rgba(201,162,39,0.08), transparent 40%), radial-gradient(circle at 80% 0%, rgba(76,141,255,0.06), transparent 35%)",
      },
    },
  },
  plugins: [],
};

export default config;
