import type { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { ink:'#20233b', panel:'#f5f6fa', line:'#e6e8ef', brand:'#b51f24', brandDark:'#8f161b', tea:'#7a5b36' } } },
  plugins: [],
} satisfies Config
