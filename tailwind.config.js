/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "black-100": "#2B2C35",
        "secondary-orange": "#f79761",
        "light-white": {
          DEFAULT: "rgba(59,60,152,0.03)",
          100: "rgba(59,60,152,0.02)",
        },
        grey: "#747A88",
        gray: {
          50: "#F9FAFB",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
        primary: {
          50: "#eff6ff", // Lighter shade of blue
          100: "#f5f8ff", // Lightest shade of blue
          150: "#d1d5db", // Light blue
          200: "#9ca3af", // ...
          300: "#9ca3af",
          400: "#f5b300",
          DEFAULT: "#DAA520", // Main golden
          500: "#d29000", // Standard golden
          600: "#b77e00", // Medium golden
          700: "#9c6b00", // Dark golden
          800: "#815800",
          900: "#684700", // Darker shade of golden
        },
      },
      backgroundImage: {
        pattern: "url('/pattern.png')",
        "hero-bg": "url('/hero-bg.png')",
        "hero-bg2": "url('/hero-bg2.png')",
      },
    },
  },
  plugins: [],
};
