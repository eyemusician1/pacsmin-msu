import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        navy: {
          50: 'hsl(var(--color-navy-50))',
          100: 'hsl(var(--color-navy-100))',
          200: 'hsl(var(--color-navy-200))',
          300: 'hsl(var(--color-navy-300))',
          400: 'hsl(var(--color-navy-400))',
          500: 'hsl(var(--color-navy-500))',
          600: 'hsl(var(--color-navy-600))',
          700: 'hsl(var(--color-navy-700))',
          800: 'hsl(var(--color-navy-800))',
          900: 'hsl(var(--color-navy-900))',
          950: 'hsl(var(--color-navy-950))',
        },
        gold: { // New gold palette
          50: 'hsl(var(--color-gold-50))',
          100: 'hsl(var(--color-gold-100))',
          200: 'hsl(var(--color-gold-200))',
          300: 'hsl(var(--color-gold-300))',
          400: 'hsl(var(--color-gold-400))',
          500: 'hsl(var(--color-gold-500))',
          600: 'hsl(var(--color-gold-600))',
          700: 'hsl(var(--color-gold-700))',
          800: 'hsl(var(--color-gold-800))',
          900: 'hsl(var(--color-gold-900))',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeInSlideUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseShadow: {
          '0%, 100%': { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)' },
          '50%': { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-slide-up": "fadeInSlideUp 0.6s ease-out forwards",
        "pulse-shadow": "pulseShadow 2s infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
