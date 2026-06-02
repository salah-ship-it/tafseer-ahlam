import type { Metadata } from 'next'
import Link from 'next/link'
import taxonomy from '@/data/taxonomy.json'
import { SITE_NAME, SITE_URL } from '@/lib/config'

type TaxNode = {
  slug: string
  nameAr: string
  level: number
  parent: string | null
  metaDescriptionAr: string
}

const allNodes = taxonomy as TaxNode[]
const l1Nodes = allNodes.filter((n) => n.level === 1)

const pageUrl = `${SITE_URL}/categories`
const title = 'جميع فئات تفسير الأحلام'
const description = 'استعرض جميع فئات تفسير الأحلام — من الحيوانات والماء إلى الزواج والموت والمهن والألوان وغيرها من الفئات بحسب ابن سيرين والنابلسي'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title, description, url: pageUrl, type: 'website', locale: 'ar_SA', siteName: SITE_NAME },
  twitter: { card: 'summary', title, description },
}

export default function CategoriesPage() {
  const categories = l1Nodes.map((node) => {
    const l2Children = allNodes.filter((n) => n.level === 2 && n.parent === node.slug)
    const l3Count = allNodes.filter((n) => {
      if (n.level !== 3) return false
      const l2 = allNodes.find((p) => p.slug === n.parent)
      return l2?.parent === node.slug
    }).length
    return { ...node, l2Count: l2Children.length, l3Count }
  })

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: title, item: pageUrl },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav aria-label="مسار التنقل" className="mb-8">
          <ol className="flex items-center flex-wrap gap-2 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-gold transition-colors">
                الرئيسية
              </Link>
            </li>
            <li aria-hidden="true" className="text-gold/30">/</li>
            <li className="text-cream/70">{title}</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mb-12 text-center">
          <h1 className="font-amiri text-gold text-4xl sm:text-5xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            {description}
          </p>
        </header>

        {/* Stats bar */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="text-center">
            <p className="font-amiri text-gold text-3xl font-bold">{l1Nodes.length}</p>
            <p className="text-muted text-sm mt-1">فئة رئيسية</p>
          </div>
          <div className="text-center">
            <p className="font-amiri text-gold text-3xl font-bold">
              {allNodes.filter((n) => n.level === 2).length}
            </p>
            <p className="text-muted text-sm mt-1">فئة فرعية</p>
          </div>
          <div className="text-center">
            <p className="font-amiri text-gold text-3xl font-bold">
              {allNodes.filter((n) => n.level === 3).length}
            </p>
            <p className="text-muted text-sm mt-1">تفسير حلم</p>
          </div>
        </div>

        {/* Categories grid */}
        <section aria-labelledby="cats-heading">
          <h2 id="cats-heading" className="sr-only">قائمة الفئات</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {categories.map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group rounded-2xl border border-gold/15 bg-navy-light p-6 hover:border-gold/40 hover:bg-gold/5 transition-all duration-200 flex items-start gap-4"
              >
                {/* Number badge */}
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-amiri text-gold text-sm font-bold">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-amiri text-gold text-xl font-semibold group-hover:text-gold-light transition-colors mb-1">
                    {cat.nameAr}
                  </h3>
                  <p className="text-cream/50 text-sm line-clamp-1 mb-3">
                    {cat.metaDescriptionAr}
                  </p>
                  <div className="flex gap-4 text-xs text-muted">
                    <span>{cat.l2Count} فئة فرعية</span>
                    <span className="text-gold/30">·</span>
                    <span>{cat.l3Count} تفسير</span>
                  </div>
                </div>
                <span className="text-gold/30 group-hover:text-gold/60 transition-colors text-lg self-center">
                  ←
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Back to home */}
        <div className="mt-14 pt-8 border-t border-gold/10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-tajawal text-sm text-gold/60 hover:text-gold transition-colors"
          >
            ← العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    </>
  )
}
