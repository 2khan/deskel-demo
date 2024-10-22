import twAnimatePlugin from 'tailwindcss-animate'
import twTypographyPlugin from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    fontFamily: {
      sans: [
        '"Zen Kaku Gothic New"',
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ],
      serif: [
        'ui-serif',
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif'
      ],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace'
      ]
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '1.75rem',
      '3xl': '2rem',
      '4xl': '2.25rem',
      '5xl': '2.625rem',
      '6xl': '3rem',
      '7xl': '3.375rem',
      '8xl': '3.75rem',
      '9xl': '4.25rem',
      '10xl': '4.75rem',
      '11xl': '5.25rem',
      '12xl': '5.75rem',
      '13xl': '7.625rem',
      '14xl': '9.75rem'
    },
    lineHeight: {
      '1': '1rem',
      '2': '1.125rem',
      '3': '1.25rem',
      '4': '1.375rem',
      '5': '1.5rem',
      '6': '1.75rem',
      '7': '1.625rem',
      '8': '1.875rem',
      '9': '2.25rem',
      '10': '2.5rem',
      '11': '2.75rem',
      '12': '3.125rem',
      '13': '3.5rem',
      '14': '4rem',
      '15': '4.375rem',
      '16': '4.875rem',
      '17': '5.375rem',
      '18': '5.875rem',
      '19': '6.375rem',
      '20': '8.125rem',
      '21': '10.25rem'
    },
    letterSpacing: {
      tighter: '-0.96px',
      tight: '-0.64px',
      normal: '0px',
      wide: '.16px',
      wider: '.32px'
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      screens: {
        '3xl': '1920px'
      },
      colors: {
        'gradient-1': 'hsl(var(--gradient-1))',
        'gradient-2': 'hsl(var(--gradient-2)',
        'gradient-3': 'hsl(var(--gradient-3))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [twAnimatePlugin, twTypographyPlugin]
} satisfies Config

export default config
