import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import taxonomy from '@/data/taxonomy.json'
import { SITE_NAME, SITE_URL } from '@/lib/config'
import type { BlogPost } from '@/lib/types'

const BLOG_DIR = join(process.cwd(), 'data', 'blog')

type TaxNode = {
  slug: string
  nameAr: string
  level: number
  parent: string | null
}

const l3Nodes = (taxonomy as TaxNode[]).filter((n) => n.level === 3)

export const dynamicParams = false

// ─── data helpers ─────────────────────────────────────────────────────────────

function getAllSlugs(): string[] {
  try {
    return readdirSync(BLOG_DIR)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace('.json', ''))
  } catch {
    return []
  }
}

function getPost(slug: string): BlogPost | null {
  try {
    const raw = readFileSync(join(BLOG_DIR, `${slug}.json`), 'utf-8')
    return JSON.parse(raw) as BlogPost
  } catch {
    return null
  }
}

// Deterministic 3-pick from L3 taxonomy nodes, seeded by slug chars.
// Same slug always produces the same 3 suggestions across builds.
function getRelatedDreams(slug: string): TaxNode[] {
  if (l3Nodes.length === 0) return []
  const seed = slug.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const picks: TaxNode[] = []
  const used = new Set<number>()
  for (let i = 0; picks.length < 3 && i < 50; i++) {
    const idx = (seed + i * 137) % l3Nodes.length
    if (!used.has(idx)) {
      used.add(idx)
      picks.push(l3Nodes[idx])
    }
  }
  return picks
}

function extractYouTubeId(post: BlogPost): string | null {
  if (post.youtubeId) return post.youtubeId
  const m = post.youtubeUrl.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

// ─── Next.js exports ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  const url = `${SITE_URL}/blog/${slug}`
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      type: 'article',
      locale: 'ar_SA',
      siteName: SITE_NAME,
      ...(post.thumbnailUrl
        ? { images: [{ url: post.thumbnailUrl, alt: post.titleAr }] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
    },
  }
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const youtubeId = extractYouTubeId(post)
  const relatedDreams = getRelatedDreams(slug)
  const pageUrl = `${SITE_URL}/blog/${slug}`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'المدونة', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.titleAr, item: pageUrl },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.titleAr,
    description: post.metaDescription,
    url: pageUrl,
    ...(post.thumbnailUrl ? { image: post.thumbnailUrl } : {}),
    inLanguage: 'ar',
    datePublished: `${post.date}T00:00:00+00:00`,
    dateModified: `${post.date}T00:00:00+00:00`,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  }

  // Paragraph array — split on blank lines for clean rendering
  const paragraphs = post.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c'),
        }}
      />

      {/* ── AdSense: leaderboard ── */}
      {/* data-slot="leaderboard-blog-top" */}
      <div
        className="adsense-slot max-w-4xl mx-auto px-4 mt-4 mb-2 text-muted text-xs text-center"
        aria-hidden="true"
      >
        {/* AdSense leaderboard 728×90 */}
      </div>

      <article className="max-w-4xl mx-auto px-4 py-10">
        {/* ── Breadcrumb ── */}
        <nav aria-label="مسار التنقل" className="mb-8">
          <ol className="flex items-center flex-wrap gap-1 text-xs text-muted tracking-wide">
            <li>
              <Link href="/" className="hover:text-gold transition-colors">
                الرئيسية
              </Link>
            </li>
            <li aria-hidden="true" className="breadcrumb-sep">‹</li>
            <li>
              <Link href="/blog" className="hover:text-gold transition-colors">
                المدونة
              </Link>
            </li>
            <li aria-hidden="true" className="breadcrumb-sep">‹</li>
            <li className="text-cream/60 font-medium truncate max-w-[200px]">
              {post.titleAr}
            </li>
          </ol>
        </nav>

        {/* ── Header ── */}
        <header className="mb-8">
          <div className="inline-block text-xs text-gold/50 border border-gold/20 rounded-full px-3 py-1 mb-4 font-tajawal">
            {post.category}
          </div>

          <div className="title-with-lines mb-4">
            <span className="title-line title-line-start" aria-hidden="true" />
            <h1 className="font-amiri text-gold text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-center shrink">
              {post.titleAr}
            </h1>
            <span className="title-line title-line-end" aria-hidden="true" />
          </div>

          <p className="text-muted text-sm font-tajawal text-center">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('ar-SA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </p>
        </header>

        {/* ── YouTube embed ── */}
        {youtubeId && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-gold/15 shadow-lg shadow-black/30">
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
                title={post.titleAr}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </div>
          </div>
        )}

        {/* ── Excerpt / lead ── */}
        <p className="text-cream/75 text-lg leading-relaxed border-s-4 border-gold/30 ps-4 mb-8">
          {post.excerpt}
        </p>

        {/* ── Article body ── */}
        <section aria-label="محتوى المقال" className="space-y-5">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-cream/80 leading-[2] text-base">
              {para}
            </p>
          ))}
        </section>

        {/* ── AdSense: in-article ── */}
        {/* data-slot="in-article-blog" */}
        <div
          className="adsense-slot my-10 text-muted text-xs text-center"
          aria-hidden="true"
        >
          {/* AdSense in-article 300×250 */}
        </div>

        {/* ── Related dream interpretations ── */}
        {relatedDreams.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-10">
            <h2
              id="related-heading"
              className="font-amiri text-gold text-2xl font-bold mb-6"
            >
              تفاسير ذات صلة
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedDreams.map((dream) => (
                <Link
                  key={dream.slug}
                  href={`/dream/${dream.slug}`}
                  className="cat-card rounded-xl border border-gold/15 bg-navy-light px-4 py-4 group flex flex-col"
                >
                  <h3 className="font-amiri text-gold font-semibold group-hover:text-gold-light transition-colors leading-snug text-base">
                    تفسير حلم {dream.nameAr}
                  </h3>
                  <span className="mt-2 text-xs text-gold/40 group-hover:text-gold/60 transition-colors font-tajawal">
                    قراءة التفسير ←
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Back link ── */}
        <div className="mt-10 pt-8 border-t border-gold/10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-tajawal text-sm text-gold/60 hover:text-gold transition-colors"
          >
            ← العودة إلى المدونة
          </Link>
        </div>
      </article>
    </>
  )
}
