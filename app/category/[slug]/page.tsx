import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import taxonomy from '@/data/taxonomy.json'
import { SITE_NAME, SITE_URL } from '@/lib/config'

type TaxNode = {
  slug: string
  nameAr: string
  level: number
  parent: string | null
  metaTitleAr: string
  metaDescriptionAr: string
  descriptionAr: string
}

const nodes = taxonomy as TaxNode[]

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return nodes
    .filter((n) => n.level === 1 || n.level === 2)
    .map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const node = nodes.find((n) => n.slug === slug)
  if (!node) return {}

  const url = `${SITE_URL}/category/${node.slug}`
  return {
    title: node.metaTitleAr,
    description: node.metaDescriptionAr,
    alternates: { canonical: url },
    openGraph: {
      title: node.metaTitleAr,
      description: node.metaDescriptionAr,
      url,
      type: 'website',
      locale: 'ar_SA',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary',
      title: node.metaTitleAr,
      description: node.metaDescriptionAr,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const node = nodes.find((n) => n.slug === slug)
  if (!node) notFound()

  if (node.level === 3) {
    redirect(`/dream/${slug}`)
  }

  const children = nodes.filter((n) => n.parent === node.slug)
  const pageUrl = `${SITE_URL}/category/${node.slug}`
  const parent = node.level === 2 ? nodes.find((n) => n.slug === node.parent) : null

  const dreamCount =
    node.level === 1
      ? nodes.filter((n) => {
          if (n.level !== 3) return false
          const l2 = nodes.find((p) => p.slug === n.parent)
          return l2?.parent === node.slug
        }).length
      : children.length

  const breadcrumbItems = [
    { name: 'الرئيسية', item: SITE_URL },
    ...(parent ? [{ name: parent.nameAr, item: `${SITE_URL}/category/${parent.slug}` }] : []),
    { name: node.nameAr, item: pageUrl },
  ]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* AdSense: leaderboard above the fold */}
      <div className="adsense-slot max-w-5xl mx-auto px-4 mt-4 mb-2 text-muted text-xs text-center" aria-hidden="true">
        {/* AdSense leaderboard 728×90 */}
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav aria-label="مسار التنقل" className="mb-8">
          <ol className="flex items-center flex-wrap gap-2 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-gold transition-colors">
                الرئيسية
              </Link>
            </li>
            {parent && (
              <>
                <li aria-hidden="true" className="text-gold/30">/</li>
                <li>
                  <Link href={`/category/${parent.slug}`} className="hover:text-gold transition-colors">
                    {parent.nameAr}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true" className="text-gold/30">/</li>
            <li className="text-cream/70">{node.nameAr}</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mb-10 text-center">
          <h1 className="font-amiri text-gold text-4xl sm:text-5xl font-bold mb-4">
            {node.nameAr}
          </h1>
          <p className="text-cream/60 text-lg mb-3">{node.descriptionAr}</p>
          <p className="text-gold/50 text-sm font-tajawal">
            يحتوي على {dreamCount} تفسير
          </p>
        </header>

        {/* Children grid */}
        {children.length === 0 ? (
          <p className="text-center text-muted py-20">لا توجد تفاسير في هذه الفئة حتى الآن.</p>
        ) : (
          <section aria-labelledby="children-heading">
            <h2 id="children-heading" className="sr-only">
              قائمة {node.nameAr}
            </h2>

            {/* AdSense: in-article unit */}
            <div className="adsense-slot mb-8 text-muted text-xs text-center" aria-hidden="true">
              {/* AdSense in-article 300×250 */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {children.map((child) => {
                const href = child.level === 2
                  ? `/category/${child.slug}`
                  : `/dream/${child.slug}`
                return (
                  <Link
                    key={child.slug}
                    href={href}
                    className="rounded-2xl border border-gold/15 bg-navy-light p-6 hover:border-gold/40 transition-colors group flex flex-col"
                  >
                    <h3 className="font-amiri text-gold text-xl font-semibold group-hover:text-gold-light transition-colors">
                      {child.nameAr}
                    </h3>
                    <p className="text-cream/50 text-sm mt-2 line-clamp-2 flex-1">
                      {child.descriptionAr}
                    </p>
                    {child.level === 3 && (
                      <span className="mt-3 text-xs text-gold/40 group-hover:text-gold/70 transition-colors font-tajawal">
                        قراءة التفسير ←
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="mt-14 pt-8 border-t border-gold/10 text-center">
          {parent ? (
            <Link
              href={`/category/${parent.slug}`}
              className="inline-flex items-center gap-2 font-tajawal text-sm text-gold/60 hover:text-gold transition-colors"
            >
              ← العودة إلى {parent.nameAr}
            </Link>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-tajawal text-sm text-gold/60 hover:text-gold transition-colors"
            >
              ← جميع الفئات
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
