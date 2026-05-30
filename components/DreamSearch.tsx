'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Dream } from '@/lib/types'

interface Props {
  dreams: Dream[]
}

export default function DreamSearch({ dreams }: Props) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim()
    if (!q) return []
    return dreams.filter(
      (d) =>
        d.title.includes(q) ||
        d.summary.includes(q) ||
        d.category.includes(q),
    )
  }, [query, dreams])

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <label htmlFor="dream-search" className="sr-only">
          ابحث عن تفسير حلمك
        </label>
        <input
          id="dream-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن تفسير حلمك... مثل: أسد، ذهب، زواج"
          className="
            w-full rounded-full bg-navy-light/80 border border-gold/30
            px-6 py-3 text-cream placeholder-muted text-base
            focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40
            transition-colors font-tajawal
          "
          autoComplete="off"
          aria-label="ابحث عن تفسير حلم"
          aria-controls="search-results"
          aria-expanded={results.length > 0}
        />
        <span className="absolute start-4 top-1/2 -translate-y-1/2 text-gold/50 pointer-events-none">
          🔍
        </span>
      </div>

      {/* Results */}
      {query.trim() && (
        <div
          id="search-results"
          role="listbox"
          aria-label="نتائج البحث"
          className="mt-3 rounded-2xl border border-gold/20 bg-navy-light overflow-hidden shadow-xl shadow-black/40"
        >
          {results.length === 0 ? (
            <p className="px-5 py-4 text-muted text-sm text-center">
              لم نجد نتائج لـ «{query}» — جرّب كلمة أخرى
            </p>
          ) : (
            <ul>
              {results.map((dream) => (
                <li key={dream.slug} role="option" aria-selected="false">
                  <Link
                    href={`/dream/${dream.slug}`}
                    className="
                      flex items-start gap-3 px-5 py-4
                      hover:bg-gold/5 transition-colors border-b border-gold/10
                      last:border-0
                    "
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-amiri text-gold font-semibold text-base leading-tight">
                        {dream.title}
                      </p>
                      <p className="text-muted text-xs mt-1 leading-relaxed line-clamp-2">
                        {dream.summary}
                      </p>
                    </div>
                    <span className="text-xs text-gold/40 shrink-0 mt-1 border border-gold/20 rounded-full px-2 py-0.5">
                      {dream.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
