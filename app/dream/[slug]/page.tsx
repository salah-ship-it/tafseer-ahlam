import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import taxonomy from '@/data/taxonomy.json'
import dreams from '@/data/dreams.json'
import DreamCard from '@/components/DreamCard'
import { SITE_NAME, SITE_URL } from '@/lib/config'
import type { Dream } from '@/lib/types'

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
const allDreams = dreams as Dream[]
const l3Nodes = nodes.filter((n) => n.level === 3)

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return l3Nodes.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const taxNode = l3Nodes.find((n) => n.slug === slug)
  if (!taxNode) return {}

  const dream = allDreams.find((d) => d.slug === slug)
  const url = `${SITE_URL}/dream/${slug}`
  const title = dream?.metaTitle ?? taxNode.metaTitleAr
  const description = dream?.metaDescription ?? taxNode.metaDescriptionAr

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      locale: 'ar_SA',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function DreamPage({ params }: Props) {
  const { slug } = await params
  const taxNode = l3Nodes.find((n) => n.slug === slug)
  if (!taxNode) notFound()

  const dream = allDreams.find((d) => d.slug === slug)
  const l2Node = nodes.find((n) => n.slug === taxNode.parent)
  const l1Node = l2Node ? nodes.find((n) => n.slug === l2Node.parent) : null

  const l2Siblings = nodes.filter(
    (n) => n.level === 3 && n.parent === taxNode.parent && n.slug !== slug
  )
  const siblings =
    l2Siblings.length >= 3
      ? l2Siblings.slice(0, 6)
      : (() => {
          const l1Cousins = nodes.filter(
            (n) =>
              n.level === 3 &&
              n.slug !== slug &&
              !l2Siblings.some((s) => s.slug === n.slug) &&
              (() => {
                const parentNode = nodes.find((p) => p.slug === n.parent)
                return parentNode?.parent === l1Node?.slug
              })()
          )
          return [...l2Siblings, ...l1Cousins].slice(0, 6)
        })()

  const pageUrl = `${SITE_URL}/dream/${slug}`
  const publishDate = '2024-01-01T00:00:00+00:00'

  const breadcrumbItems = [
    { name: 'الرئيسية', item: SITE_URL },
    ...(l1Node ? [{ name: l1Node.nameAr, item: `${SITE_URL}/category/${l1Node.slug}` }] : []),
    ...(l2Node ? [{ name: l2Node.nameAr, item: `${SITE_URL}/category/${l2Node.slug}` }] : []),
    { name: taxNode.nameAr, item: pageUrl },
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

      {dream && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: dream.title,
              description: dream.metaDescription,
              url: pageUrl,
              inLanguage: 'ar',
              author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
              publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
              datePublished: publishDate,
              dateModified: publishDate,
              ...(l2Node ? { articleSection: l2Node.nameAr } : {}),
            }),
          }}
        />
      )}

      {/* ── AdSense: leaderboard above the fold ── */}
      {/* data-slot="leaderboard-dream-top" */}
      <div className="adsense-slot max-w-4xl mx-auto px-4 mt-4 mb-2 text-muted text-xs text-center" aria-hidden="true">
        {/* AdSense leaderboard 728×90 — insert script here */}
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
            {l1Node && (
              <>
                <li aria-hidden="true" className="breadcrumb-sep">‹</li>
                <li>
                  <Link href={`/category/${l1Node.slug}`} className="hover:text-gold transition-colors">
                    {l1Node.nameAr}
                  </Link>
                </li>
              </>
            )}
            {l2Node && (
              <>
                <li aria-hidden="true" className="breadcrumb-sep">‹</li>
                <li>
                  <Link href={`/category/${l2Node.slug}`} className="hover:text-gold transition-colors">
                    {l2Node.nameAr}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true" className="breadcrumb-sep">‹</li>
            <li className="text-cream/60 font-medium">{taxNode.nameAr}</li>
          </ol>
        </nav>

        {/* ── Title ── */}
        <header className="mb-8">
          {l2Node && (
            <div className="inline-block text-xs text-gold/50 border border-gold/20 rounded-full px-3 py-1 mb-4 font-tajawal">
              {l2Node.nameAr}
            </div>
          )}
          <div className="title-with-lines mb-4">
            <span className="title-line title-line-start" aria-hidden="true" />
            <h1 className="font-amiri text-gold text-4xl sm:text-5xl font-bold leading-tight text-center shrink">
              تفسير حلم {taxNode.nameAr}
            </h1>
            <span className="title-line title-line-end" aria-hidden="true" />
          </div>
          {dream && (
            <p className="text-cream/70 text-lg leading-relaxed border-s-4 border-gold/30 ps-4">
              {dream.summary}
            </p>
          )}
        </header>

        {dream ? (
          /* ── Full interpretation ── */
          <section aria-labelledby="interpretations-heading">
            <h2 id="interpretations-heading" className="font-amiri text-gold text-2xl font-bold mb-6">
              التفاسير
            </h2>
            <div className="space-y-6">
              {dream.interpretations.map((interp, i) => (
                <div key={i} className="interp-card rounded-2xl border border-gold/15 bg-navy-light p-6">
                  <h3 className="font-amiri text-gold-light text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="text-gold/40 text-sm">✦</span>
                    تفسير {interp.source}
                  </h3>
                  <p className="text-cream/75 leading-[2] text-base">{interp.text}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* ── Coming soon placeholder ── */
          <section className="rounded-2xl border border-gold/15 bg-navy-light p-10 text-center">
            <div className="text-4xl mb-4 text-gold/40">✦</div>
            <h2 className="font-amiri text-gold text-2xl font-bold mb-3">
              قريباً — تفسير حلم {taxNode.nameAr}
            </h2>
            <p className="text-cream/60 leading-relaxed max-w-md mx-auto">
              {taxNode.descriptionAr}. نعمل على إضافة تفسير تفصيلي لهذه الرؤيا قريباً بحسب ابن سيرين والنابلسي.
            </p>
          </section>
        )}

        {/* ── AdSense: in-article unit ── */}
        {/* data-slot="in-article-dream" */}
        <div className="adsense-slot my-10 text-muted text-xs text-center" aria-hidden="true">
          {/* AdSense in-article 300×250 — insert script here */}
        </div>

        {/* ── Siblings ── */}
        {siblings.length > 0 && (
          <section aria-labelledby="siblings-heading" className="mt-10">
            <h2 id="siblings-heading" className="font-amiri text-gold text-2xl font-bold mb-6">
              أحلام مشابهة في نفس الفئة
            </h2>
            <div className="siblings-scroll">
              {siblings.map((sibling) => {
                const siblingDream = allDreams.find((d) => d.slug === sibling.slug)
                if (siblingDream) {
                  return <DreamCard key={sibling.slug} dream={siblingDream} />
                }
                return (
                  <Link
                    key={sibling.slug}
                    href={`/dream/${sibling.slug}`}
                    className="rounded-xl border border-gold/15 bg-navy-light px-4 py-3 hover:border-gold/40 transition-colors group"
                  >
                    <h3 className="font-amiri text-gold text-base font-semibold group-hover:text-gold-light transition-colors leading-snug">
                      تفسير حلم {sibling.nameAr}
                    </h3>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* ── Back to L2 category ── */}
        {l2Node && (
          <div className="mt-10 pt-8 border-t border-gold/10">
            <Link
              href={`/category/${l2Node.slug}`}
              className="inline-flex items-center gap-2 font-tajawal text-sm text-gold/60 hover:text-gold transition-colors"
            >
              ← العودة إلى {l2Node.nameAr}
            </Link>
          </div>
        )}
      </article>

      {/* ── Scroll to top ── */}
      <button
        id="scroll-top-btn"
        type="button"
        aria-label="العودة للأعلى"
      >
        ↑ العودة للأعلى
      </button>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
  var btn = document.getElementById('scroll-top-btn');
  if (!btn) return;
  btn.addEventListener('click', function(){ window.scrollTo({top:0,behavior:'smooth'}); });
  window.addEventListener('scroll', function(){
    btn.classList.toggle('is-visible', window.scrollY > 300);
  }, {passive: true});
})();`,
        }}
      />
    </>
  )
}
