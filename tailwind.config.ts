import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        sans:    ["'Outfit'", "system-ui", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        purple: {
          DEFAULT: "#5603ad",
          mid:     "#8367c7",
          dark:    "#3d0080",
        },
        mint: {
          DEFAULT: "#b3e9c7",
          mid:     "#c2f8cb",
          light:   "#f0fff1",
        },
      },
      animation: {
        "fade-up":      "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "modal-enter":  "modal-enter 0.4s cubic-bezier(0.16,1,0.3,1) both",
        "float":        "float 6s ease-in-out infinite",
      },
      keyframes: {
        "fade-up":     { from:{ opacity:"0", transform:"translateY(24px)" }, to:{ opacity:"1", transform:"translateY(0)" } },
        "modal-enter": { from:{ opacity:"0", transform:"translateY(20px) scale(0.97)" }, to:{ opacity:"1", transform:"translateY(0) scale(1)" } },
        "float":       { "0%,100%":{ transform:"translateY(0px)" }, "50%":{ transform:"translateY(-10px)" } },
      },
      backdropBlur: { xs: "4px" },
    },
  },
  plugins: [],
} satisfies Config;