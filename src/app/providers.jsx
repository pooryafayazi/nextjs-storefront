'use client'

import { ThemeProvider, Global, css } from '@emotion/react'

const theme = {
  colors: {
    text: '#111827',
    primary: '#2563eb',
    accent: 'green',
    bg: '#ffffff',
  },
  fontSizes: {
    sm: '12px',
    md: '14px',
    lg: '18px',
  },
  space: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
  },
  radii: {
    sm: '6px',
    md: '10px',
  },
}

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          :root {
            color-scheme: light;
          }
          body {
            background: ${theme.colors.bg};
            color: ${theme.colors.text};
          }
        `}
      />
      {children}
    </ThemeProvider>
  )
}
