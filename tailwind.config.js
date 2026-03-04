/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stripe: {
          primary: '#1A1F36',
          secondary: '#5E6E82',
          accent: '#635BFF',
          'accent-hover': '#0A2540',
          background: '#F7F9FC',
          card: '#FFFFFF',
          border: '#E3E8EE',
          'hover-bg': '#F6F9FC',
          'tag-bg': '#E0E7FF',
          'tag-text': '#635BFF',
        }
      },
      fontFamily: {
        heading: ['Caliste', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'sans-serif'],
        code: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'card': '8px',
      },
      boxShadow: {
        'card': '0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08)',
      },
      typography: {
        stripe: {
          css: {
            '--tw-prose-body': '#1A1F36',
            '--tw-prose-headings': '#1A1F36',
            '--tw-prose-links': '#635BFF',
            '--tw-prose-bold': '#1A1F36',
            '--tw-prose-code': '#635BFF',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
