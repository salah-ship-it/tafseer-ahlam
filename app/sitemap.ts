import type { MetadataRoute } from 'next'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import taxonomy from '@/data/taxonomy.json'
import { SITE_URL } from '@/lib/config'
import type { BlogPost } from '@/lib/types'

type TaxNode = {
  slug: string
  level: number
}

const nodes = taxonomy as TaxNode[]
const BLOG_DIR = join(process.cwd(), 'data', 'blog')

function getBlogEntries(): { slug: string; date: string }[] {
  try {
    return readdirSync(BLOG_DIR)
      .filter((f) => f.endsWith('.json'))
      .map((f) => {
        const post = JSON.parse(readFileSync(join(BLOG_DIR, f), 'utf-8')) as BlogPost
        return { slug: post.slug, date: post.date }
      })
  } catch {
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const blogEntries = getBlogEntries()

  const homepage: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]

  const blogListing: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogEntries.map(({ slug, date }) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const l1Routes: MetadataRoute.Sitemap = nodes
    .filter((n) => n.level === 1)
    .map((n) => ({
      url: `${SITE_URL}/category/${n.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    }))

  const l2Routes: MetadataRoute.Sitemap = nodes
    .filter((n) => n.level === 2)
    .map((n) => ({
      url: `${SITE_URL}/category/${n.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

  const l3Routes: MetadataRoute.Sitemap = nodes
    .filter((n) => n.level === 3)
    .map((n) => ({
      url: `${SITE_URL}/dream/${n.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  return [
    ...homepage,
    ...blogListing,
    ...blogRoutes,
    ...l1Routes,
    ...l2Routes,
    ...l3Routes,
  ]
}
