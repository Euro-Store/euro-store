import type { Config } from "tailwindcss"
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold:  { DEFAULT: "#d4a017", light: "#f2c94c", deep: "#a87400" },
        dark:  { base: "#0a0a0a", surface: "#121212", elevated: "#1a1a1a", border: "#2a2a2a" },
      },
      fontFamily: { sans: ["Tajawal", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
}
export default config
