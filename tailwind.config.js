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
        cream: {
          50: '#FDFCFB',
          100: '#FBF9F5',
          200: '#F5F2EB',
          300: '#EEE9DE',
        },
        stone: {
          850: '#21201D',
          925: '#141412',
          950: '#0C0A09',
        },
        sage: {
          50: '#F4F7F5',
          100: '#E4ECE7',
          500: '#4A7C59',
          600: '#3D684A',
          700: '#2E5139',
        },
        warm: {
          50: '#FAF8F5',
          100: '#F4EFEA',
          200: '#E8DFD8',
          800: '#2C2825',
          900: '#1A1816',
        }
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'SF Pro Text'",
          "'SF Pro Display'",
          "'Inter'",
          "system-ui",
          "sans-serif"
        ],
        mono: [
          "'SF Mono'",
          "'Fira Code'",
          "'JetBrains Mono'",
          "Menlo",
          "monospace"
        ]
      }
    },
  },
  plugins: [],
}
