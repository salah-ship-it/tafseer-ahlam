import type { Metadata } from 'next'
import { Amiri, Tajawal } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/config'
import { Analytics } from '@vercel/analytics/next'

const amiri = Amiri({
  variable: '--font-amiri',
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
})

const tajawal = Tajawal({
  variable: '--font-tajawal',
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - ابن سيرين والنابلسي`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ابن سيرين والنابلسي`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - ابن سيرين والنابلسي`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  verification: {
    google: 'zPrpkWS1s2iim_K2azmPoAE3g2R38wNzsb_RAcLU9Z8',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'ar',
  description: SITE_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${tajawal.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-navy text-cream font-tajawal antialiased flex flex-col">
        {/* ── Header ── */}
        <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur border-b border-gold/10">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <a
              href="/"
              className="font-amiri text-gold text-xl font-bold hover:text-gold-light transition-colors"
            >
              ✦ تفسير الأحلام
            </a>
            <nav aria-label="التنقل الرئيسي">
              <ul className="flex gap-6 text-sm text-cream/70">
                <li>
                  <a href="/" className="hover:text-gold transition-colors">
                    الرئيسية
                  </a>
                </li>
                <li>
                  <a
                    href="/categories"
                    className="hover:text-gold transition-colors"
                  >
                    الفئات
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        {/* ── Footer ── */}
        <footer className="border-t border-gold/10 bg-navy-dark mt-16">
          <div className="max-w-6xl mx-auto px-4 py-10 text-center">
            <p className="font-amiri text-gold text-lg mb-2">
              ✦ تفسير الأحلام
            </p>
            <p className="text-muted text-sm mb-4">
              تفاسير العلماء الكبار — ابن سيرين والنابلسي
            </p>
            <p className="text-muted text-xs">
              جميع التفاسير للأغراض التعليمية والثقافية فقط
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
