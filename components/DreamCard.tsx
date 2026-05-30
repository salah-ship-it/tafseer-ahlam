import Link from 'next/link'
import type { Dream } from '@/lib/types'

interface Props {
  dream: Dream
  showCategory?: boolean
}

export default function DreamCard({ dream, showCategory = true }: Props) {
  return (
    <Link
      href={`/dream/${dream.slug}`}
      className="
        group block rounded-2xl border border-gold/15 bg-navy-light
        p-5 hover:border-gold/40 hover:bg-gold/5
        transition-all duration-200 focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-gold/50
      "
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-amiri text-gold text-lg font-semibold leading-snug group-hover:text-gold-light transition-colors">
          {dream.title}
        </h3>
        {showCategory && (
          <span className="shrink-0 text-xs text-gold/50 border border-gold/20 rounded-full px-2 py-0.5 mt-1">
            {dream.category}
          </span>
        )}
      </div>
      <p className="text-cream/60 text-sm leading-relaxed line-clamp-3">
        {dream.summary}
      </p>
      <div className="mt-4 flex items-center gap-1 text-gold/40 text-xs font-tajawal">
        <span>ابن سيرين</span>
        <span className="text-gold/20">•</span>
        <span>النابلسي</span>
      </div>
    </Link>
  )
}
