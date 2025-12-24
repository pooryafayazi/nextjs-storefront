# Next.js + Emotion (SSR) Starter (App Router)

A Next.js (App Router) project configured with **Emotion (SSR-ready)**, a **Theme Provider**, and a clean developer experience using **ESLint + Prettier + EditorConfig + VSCode auto-format on save**. The app is configured for **Persian/RTL** (`lang="fa"` and `dir="rtl"`).

## Key Features

- **Next.js App Router** structure (`src/app`)
- **Emotion SSR support** via a custom `EmotionRegistry`
- **ThemeProvider + Global styles** (Emotion)
- **ESLint + Prettier integration** (no rule conflicts)
- **VSCode format-on-save** + ESLint auto-fix on save
- **Consistent formatting** via `.editorconfig`

---

## Tech Stack

- **Next.js** (App Router)
- **React**
- **Emotion**: `@emotion/react`, `@emotion/styled`, `@emotion/cache`
- **ESLint**
- **Prettier**
- **VSCode workspace settings** + `.editorconfig`

---

## Requirements

- **Node.js**: recommended LTS (latest stable)
- **npm** (or yarn/pnpm if you prefer)

---

## Getting Started

### 1) Install dependencies

```bash
npx create-react-app
```

### 2) Run the development server

```bash
npm run dev
```

Then open `http://localhost:3000`.

### 3) Build for production

```bash
npm run build
npm run start
```

---

## GitHub Repository Setup (Initial Push)

Typical flow to push an existing local project to GitHub:

```bash
git init
git remote add origin https://github.com/pooryafayazi/REPOSITORY-NAME.git
git branch -M main
git push -u origin main

git add -A
git commit -m "initial commit"
git push
```

> Tip: Replace `REPOSITORY-NAME` with your actual GitHub repository name.

---

## Code Quality Setup (ESLint + Prettier)

### ESLint initialization

If not already configured:

```bash
npm init @eslint/config
# or
eslint --init
```

### Prettier config

Create a `.prettierrc.yml` in the project root:

```yml
trailingComma: 'es5'
tabWidth: 2
semi: false
singleQuote: true
```

### ESLint ↔ Prettier compatibility

Install:

```bash
npm i eslint-config-prettier --save-dev
npm i eslint-plugin-prettier --save-dev
```

Then update your ESLint config (eslint.config.mjs) to include Prettier in `extends`:

```js
extends: [
  "js/recommended",
  "plugin:react/recommended",
  "prettier"
]
```

---

## VSCode Workspace Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[javascriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },

  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },

  "eslint.validate": ["javascript", "javascriptreact"]
}
```

---

## EditorConfig

Create `.editorconfig` in the project root:

```ini
[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = space
indent_size = 2
```

---

## Emotion Setup (App Router + SSR)

### 1) Install Emotion packages

```bash
npm i @emotion/react @emotion/styled @emotion/cache
```

### 2) Enable Emotion compiler in Next.js

In `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  reactCompiler: true,
}

export default nextConfig
```

### 3) Create `EmotionRegistry` for SSR

Create `src/app/EmotionRegistry.jsx`:

```jsx
'use client'

import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

function createEmotionCache() {
  const cache = createCache({ key: 'css' })
  cache.compat = true
  return cache
}

export default function EmotionRegistry({ children }) {
  const [cache] = useState(() => {
    const c = createEmotionCache()
    c.__inserted = []
    const prevInsert = c.insert

    c.insert = (...args) => {
      const serialized = args[1]
      if (c.inserted[serialized.name] === undefined) {
        c.__inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }

    return c
  })

  useServerInsertedHTML(() => {
    const names = cache.__inserted
    if (names.length === 0) return null

    cache.__inserted = []

    let styles = ''
    for (const name of names) styles += cache.inserted[name]

    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
}
```

---

## Theme Provider (Emotion Theme + Global Styles)

Create `src/app/providers.jsx`:

```jsx
'use client'

import { ThemeProvider, Global, css } from '@emotion/react'

const theme = {
  colors: {
    text: '#111827',
    primary: '#2563eb',
    accent: 'hotpink',
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
```

---

## Root Layout Wrapping (Registry + Providers)

Update `src/app/layout.js`:

```jsx
import './globals.css'
import EmotionRegistry from './EmotionRegistry'
import Providers from './providers'

export const metadata = {
  title: 'My App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <EmotionRegistry>
          <Providers>{children}</Providers>
        </EmotionRegistry>
      </body>
    </html>
  )
}
```

---

## Using the Theme in App Router Pages

Because the theme is based on React Context, any component that consumes Emotion theme must be a **Client Component**.

### Example: About page

Create `src/app/about/AboutClient.jsx`:

```jsx
'use client'

import { css, useTheme } from '@emotion/react'

export default function AboutClient() {
  const theme = useTheme()

  return (
    <div
      css={css`
        font-size: ${theme.fontSizes.lg};
        color: ${theme.colors.accent};
        padding: ${theme.space[3]};
        border-radius: ${theme.radii.md};
      `}
    >
      This is the about page (themed).
    </div>
  )
}
```

Keep the route page as a Server Component (useful for metadata):

Create `src/app/about/page.jsx`:

```jsx
import Link from 'next/link'
import AboutClient from './AboutClient'

export const metadata = {
  title: 'About',
}

export default function About() {
  return (
    <main>
      <Link
        className="About mb-4 inline-block text-blue-500 underline"
        href="/"
      >
        Go to Home
      </Link>

      <AboutClient />
    </main>
  )
}
```

---

## Suggested Project Structure

```text
src/
  app/
    EmotionRegistry.jsx
    providers.jsx
    layout.js
    globals.css
    page.jsx
    about/
      page.jsx
      AboutClient.jsx
.vscode/
  settings.json
.editorconfig
.prettierrc.yml
eslint.config.mjs (or equivalent)
next.config.js
package.json
```

---

## Useful Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Optional formatting commands (if you use Prettier CLI):

```bash
npx prettier --check .
npx prettier --write .
```

---

## Notes

- `EmotionRegistry` is essential for correct Emotion styles during **SSR** in the **Next.js App Router**.
- Theme usage is **Client-side** because it depends on React Context (`useTheme`).

---

## License

Choose one:

- MIT
- Apache-2.0
- Proprietary / All rights reserved

(Add a `LICENSE` file if you pick MIT/Apache.)
