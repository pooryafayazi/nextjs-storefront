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
