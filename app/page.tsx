import type { Metadata } from 'next'
import Link from 'next/link'
import dreams from '@/data/dreams.json'
import taxonomy from '@/data/taxonomy.json'
import DreamSearch from '@/components/DreamSearch'
import DreamCard from '@/components/DreamCard'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/config'
import type { Dream } from '@/lib/types'

type TaxNode = {
  slug: string
  nameAr: string
  level: number
  parent: string | null
}

const allNodes = taxonomy as TaxNode[]
const l1Nodes = allNodes.filter((n) => n.level === 1)
const l3Nodes = allNodes.filter((n) => n.level === 3)

export const metadata: Metadata = {
  title: 'تفسير الأحلام - ابن سيرين والنابلسي',
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'تفسير الأحلام - ابن سيرين والنابلسي',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تفسير الأحلام - ابن سيرين والنابلسي',
    description: SITE_DESCRIPTION,
  },
}

const popularTags = [
  { label: 'الأسد', slug: 'tafseer-hulum-asad' },
  { label: 'الثعبان', slug: 'tafseer-hulum-thuban' },
  { label: 'الأفعى', slug: 'tafseer-hulum-afaa' },
  { label: 'الحمام', slug: 'tafseer-hulum-hamam' },
  { label: 'الذهب', slug: 'tafseer-hulum-dhahab' },
  { label: 'عقد الزواج', slug: 'tafseer-hulum-aqd-zawaj' },
  { label: 'موت النفس', slug: 'tafseer-hulum-mawt-nafsi' },
  { label: 'مطر غزير', slug: 'tafseer-hulum-matar-ghaziir' },
  { label: 'شمس مشرقة', slug: 'tafseer-hulum-shams-mushriqa' },
  { label: 'القمر البدر', slug: 'tafseer-hulum-qamar-badr' },
  { label: 'الأسنان', slug: 'tafseer-hulum-asnaan' },
  { label: 'البحر الهادئ', slug: 'tafseer-hulum-bahr-haadi' },
]

export default function HomePage() {
  const typedDreams = dreams as Dream[]

  const l1WithCounts = l1Nodes.map((node) => {
    const l3Count = allNodes.filter((n) => {
      if (n.level !== 3) return false
      const l2 = allNodes.find((p) => p.slug === n.parent)
      return l2?.parent === node.slug
    }).length
    return { ...node, count: l3Count }
  })

  return (
    <>
      {/* ── AdSense: leaderboard above the fold ── */}
      {/* data-slot="leaderboard-top" */}
      <div className="adsense-slot w-full max-w-6xl mx-auto px-4 mt-2 mb-1 text-muted text-xs text-center" aria-hidden="true">
        {/* AdSense leaderboard 728×90 — insert script here */}
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[65vh] flex flex-col items-center justify-center py-24 px-4">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(165deg, #131a3d 0%, #0b1026 55%, #07091a 100%)',
          }}
        />
        <div className="stars-bg absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 text-center w-full max-w-3xl mx-auto">
          <p className="hero-fade hero-fade-delay-1 font-tajawal text-gold/50 text-sm tracking-widest mb-4 uppercase">
            بسم الله الرحمن الرحيم
          </p>
          <h1 className="hero-title hero-fade hero-fade-delay-2 font-amiri text-6xl sm:text-7xl md:text-8xl text-gold font-bold mb-5 leading-tight">
            {SITE_NAME}
          </h1>
          <p className="hero-fade hero-fade-delay-3 font-tajawal text-cream/60 text-lg sm:text-xl mb-6 leading-relaxed">
            اكتشف معاني رؤاك بتفاسير ابن سيرين والنابلسي والعلماء الكبار
          </p>

          <div className="diamond-divider hero-fade hero-fade-delay-3 mb-8" aria-hidden="true" />

          <div className="hero-fade hero-fade-delay-4">
            <DreamSearch dreams={typedDreams} />
          </div>
        </div>

        {/* bottom gradient fade into page background */}
        <div
          className="absolute bottom-0 inset-x-0 h-28 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--navy))' }}
          aria-hidden="true"
        />
      </section>

      <div className="max-w-6xl mx-auto px-4">
        {/* ── Category Grid ── */}
        <section className="py-14" aria-labelledby="categories-heading">
          <h2
            id="categories-heading"
            className="font-amiri text-gold text-3xl font-bold mb-8 text-center"
          >
            تصفّح حسب الفئة
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {l1WithCounts.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="
                  cat-card group flex flex-col items-center justify-center gap-3
                  rounded-2xl border border-gold/15 bg-navy-light
                  p-6 text-center
                "
              >
                <span className="font-amiri text-gold text-lg font-semibold group-hover:text-gold-light transition-colors">
                  {cat.nameAr}
                </span>
                <span className="text-xs text-muted">
                  يحتوي على {cat.count} تفسير
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Latest Added Dreams ── */}
        <section className="py-10 border-t border-gold/10" aria-labelledby="latest-heading">
          <h2
            id="latest-heading"
            className="font-amiri text-gold text-2xl font-bold mb-6 text-center"
          >
            آخر التفاسير المضافة
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {l3Nodes.slice(-8).map((node) => (
              <Link
                key={node.slug}
                href={`/dream/${node.slug}`}
                className="rounded-xl border border-gold/15 bg-navy-light px-4 py-3 hover:border-gold/40 transition-colors group"
              >
                <span className="font-amiri text-gold text-base font-semibold group-hover:text-gold-light transition-colors leading-snug block">
                  تفسير حلم {node.nameAr}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Most-Searched Tag Cloud ── */}
        <section className="py-10 border-t border-gold/10" aria-labelledby="tags-heading">
          <h2
            id="tags-heading"
            className="font-amiri text-gold text-2xl font-bold mb-6 text-center"
          >
            الأكثر بحثاً
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {popularTags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/dream/${tag.slug}`}
                className="
                  font-tajawal text-sm px-4 py-2 rounded-full
                  border border-gold/25 text-gold/70 bg-navy-light
                  hover:border-gold hover:text-gold hover:bg-gold/5
                  transition-all duration-200
                "
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ── Recent Dreams ── */}
        <section className="py-14 border-t border-gold/10" aria-labelledby="recent-heading">
          <h2
            id="recent-heading"
            className="font-amiri text-gold text-3xl font-bold mb-8 text-center"
          >
            أحدث التفاسير
          </h2>

          {/* AdSense: in-article unit */}
          {/* data-slot="in-article-recent" */}
          <div className="adsense-slot mb-8 text-muted text-xs text-center" aria-hidden="true">
            {/* AdSense in-article 300×250 — insert script here */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {typedDreams.slice(0, 9).map((dream) => (
              <DreamCard key={dream.slug} dream={dream} />
            ))}
          </div>

          {typedDreams.length > 9 && (
            <div className="text-center mt-10">
              <Link
                href={`/category/${l1Nodes[0]?.slug ?? ''}`}
                className="
                  inline-block font-tajawal text-sm px-8 py-3 rounded-full
                  border border-gold/40 text-gold
                  hover:bg-gold hover:text-navy transition-all duration-200
                "
              >
                عرض جميع التفاسير
              </Link>
            </div>
          )}
        </section>
        {/* ── Site total count note ── */}
        <p className="py-8 border-t border-gold/10 text-center text-xs text-muted font-tajawal">
          الموقع يحتوي على {l3Nodes.length} تفسير حلم
        </p>
      </div>
    </>
  )
}
