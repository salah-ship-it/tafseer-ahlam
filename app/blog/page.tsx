import type { Metadata } from 'next'
import Link from 'next/link'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { SITE_NAME, SITE_URL } from '@/lib/config'
import type { BlogPost } from '@/lib/types'

const BLOG_DIR = join(process.cwd(), 'data', 'blog')

function getAllPosts(): BlogPost[] {
  try {
    return readdirSync(BLOG_DIR)
      .filter((f) => f.endsWith('.json'))
      .map((f) => JSON.parse(readFileSync(join(BLOG_DIR, f), 'utf-8')) as BlogPost)
      .sort((a, b) => b.date.localeCompare(a.date))
  } catch {
    return []
  }
}

export const metadata: Metadata = {
  title: 'مقالات تفسير الأحلام',
  description: 'مقالات ومواضيع متخصصة في تفسير الأحلام والرؤى بحسب ابن سيرين والنابلسي، مستوحاة من قناة الشيخ إسماعيل الجابري',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'مقالات تفسير الأحلام',
    description: 'مقالات ومواضيع متخصصة في تفسير الأحلام والرؤى بحسب ابن سيرين والنابلسي',
    url: `${SITE_URL}/blog`,
    type: 'website',
    locale: 'ar_SA',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مقالات تفسير الأحلام',
    description: 'مقالات ومواضيع متخصصة في تفسير الأحلام والرؤى',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* ── Header ── */}
      <header className="mb-12 text-center">
        <p className="font-tajawal text-gold/50 text-sm tracking-widest mb-4 uppercase">
          الشيخ إسماعيل الجابري
        </p>
        <h1 className="font-amiri text-gold text-4xl sm:text-5xl font-bold mb-4">
          مقالات تفسير الأحلام
        </h1>
        <p className="text-cream/60 text-lg max-w-xl mx-auto leading-relaxed">
          مواضيع وتفاسير منتقاة، مستوحاة من قناة الشيخ إسماعيل الجابري على يوتيوب
        </p>
      </header>

      {/* ── Grid ── */}
      {posts.length === 0 ? (
        <div className="text-center py-24 text-muted">
          <p className="font-amiri text-2xl mb-3 text-gold/40">✦</p>
          <p>لا توجد مقالات حتى الآن.</p>
          <p className="text-sm mt-2">
            شغّل{' '}
            <code className="text-gold/70 bg-navy-light px-2 py-0.5 rounded text-xs">
              node scripts/youtube-to-blog.mjs &lt;url&gt;
            </code>{' '}
            لإضافة مقال.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="cat-card group rounded-2xl border border-gold/15 bg-navy-light overflow-hidden flex flex-col"
            >
              {/* Thumbnail */}
              {post.thumbnailUrl && (
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.thumbnailUrl}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 to-transparent" />
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xl backdrop-blur-sm">
                      ▶
                    </span>
                  </div>
                  <span className="absolute bottom-2 start-3 text-xs font-tajawal text-gold/80 border border-gold/30 rounded-full px-2.5 py-0.5 bg-navy-dark/70 backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              )}

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <h2 className="font-amiri text-gold text-lg font-semibold leading-snug mb-2 group-hover:text-gold-light transition-colors">
                  {post.titleAr}
                </h2>
                <p className="text-cream/55 text-sm leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <time
                    dateTime={post.date}
                    className="text-xs text-muted font-tajawal"
                  >
                    {new Date(post.date).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className="text-xs text-gold/40 group-hover:text-gold/70 transition-colors font-tajawal">
                    قراءة ←
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
