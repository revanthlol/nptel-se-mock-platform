/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        warm: {
          canvas: '#F7F6F2',
          surface: '#EFECE6',
          'surface-hover': '#E8E4DC',
          pill: '#EAE6DC',
          charcoal: '#1F1E1B',
          muted: '#6E6B63',
          border: 'rgba(31, 30, 27, 0.08)',
        },
        sage: {
          50: '#F4F7F5',
          100: '#E2ECE5',
          200: '#C7DBCF',
          300: '#A4C4AF',
          400: '#7BA68B',
          500: '#4A7C59',
          600: '#3D684A',
          700: '#2E5139',
          800: '#243F2D',
          900: '#1A2F22',
        },
        dark: {
          canvas: '#131416',
          surface: '#1B1C20',
          'surface-hover': '#24252B',
          pill: '#222329',
          text: '#F0EFEA',
          muted: '#9B9890',
          border: 'rgba(240, 239, 234, 0.08)',
        }
      },
      fontFamily: {
        heading: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        sans: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "'SF Mono'", "Menlo", "monospace"]
      }
    },
  },
  plugins: [],
}
