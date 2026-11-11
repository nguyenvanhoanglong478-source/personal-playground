/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        folio: {
          bg: 'var(--bg-primary)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          ink: 'var(--text-primary)',
          muted: 'var(--text-secondary)',
          faint: 'var(--text-faint)',
          accent: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)',
          border: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
          gblue: 'var(--google-blue)',
          gpurple: 'var(--google-purple)',
          gcoral: 'var(--google-coral)',
          gred: 'var(--google-red)',
          gyellow: 'var(--google-yellow)',
          ggreen: 'var(--google-green)',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
};
