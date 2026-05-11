/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.html",
    "./pages/**/*.html",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        // ── M3 ROLE TOKENS (palette: midnight navy / bronze / slate / muted-blue / mist) ─────
        'primary': '#b57c34',                  // bronze
        'on-primary': '#FFFFFF',
        'primary-container': '#F4ECDB',        // light bronze
        'on-primary-container': '#1A1F2E',

        'secondary': '#33486f',                // slate
        'on-secondary': '#FFFFFF',
        'secondary-container': '#E2E5EC',      // light slate
        'on-secondary-container': '#071734',

        'gold': '#33486f',                     // structural editorial accent (slate)
        'gold-soft': '#E8D2B0',                // light bronze (text on dark) — readable golden
        'tertiary': '#647293',                 // muted blue
        'on-tertiary': '#FFFFFF',
        'tertiary-container': '#EEF0F5',
        'on-tertiary-container': '#071734',

        'error': '#7A1F1F',
        'on-error': '#FFFFFF',
        'error-container': '#F4DEDE',
        'on-error-container': '#3A0808',

        'surface': '#FFFFFF',
        'surface-1': '#FAFAFA',                // very light cool tint
        'surface-2': '#F4F4F4',                // light grey
        'surface-3': '#EEEEEE',                // mist (the palette light grey)
        'surface-4': '#E2E5EC',                // light slate
        'surface-5': '#D4D8E0',
        'surface-warm': '#F4ECDB',             // light bronze warm tint
        'surface-variant': '#E2E5EC',
        'on-surface': '#1A1F2E',               // deep cool charcoal
        'on-surface-variant': '#33486f',
        'outline': '#647293',
        'outline-variant': '#D4D8E0',

        // ── Legacy aliases (mapped to navy + bronze palette) ────────────
        obsidian: '#071734',                   // midnight navy (was light, now actually dark)
        'console-black': '#071734',
        'panel-line': '#D4D8E0',
        'gold-primary': '#b57c34',             // bronze (warm pop, primary emphasis)
        'gold-glow': '#E8D2B0',                // light bronze (for text on dark navy)
        'crimson-deep': '#1F3457',             // deep slate
        'crimson-glow': '#b57c34',             // bronze
        'bone-white': '#F4F1EA',               // warm bone (text on dark surfaces)
        'pearl-white': '#FFFFFF',
        'console-dim': '#647293',              // muted blue (subtle hierarchy)
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '28px',
        'full': '9999px',
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.2, 0, 0, 1)',
        'emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
        'emphasized-decelerate': 'cubic-bezier(0.05, 0.7, 0.1, 1)',
        'emphasized-accelerate': 'cubic-bezier(0.3, 0, 0.8, 0.15)',
      },
      transitionDuration: {
        'short-1': '50ms',
        'short-3': '150ms',
        'medium-2': '300ms',
        'long-2': '500ms',
        'extra-long-1': '700ms',
        'extra-long-4': '1000ms',
      },
      fontFamily: {
        'display': ['var(--font-display)'],
        'ui':      ['var(--font-ui)'],
        'mono':    ['var(--font-mono)'],
        'body':    ['var(--font-ui)'],
        'thai':    ['"IBM Plex Sans Thai"', 'sans-serif'],
      },
      maxWidth: {
        '1600': '1600px',
      },
      animation: {
        'pulse-soft': 'pulse-soft 2s infinite',
        'fadeUp': 'fadeUp 1s ease forwards',
        'fadeIn': 'fadeIn 1.2s ease forwards',
        'ticker': 'ticker 60s linear infinite',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
