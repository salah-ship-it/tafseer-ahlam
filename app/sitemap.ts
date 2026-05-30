import type { MetadataRoute } from 'next'
import taxonomy from '@/data/taxonomy.json'
import { SITE_URL } from '@/lib/config'

type TaxNode = {
  slug: string
  level: number
}

const nodes = taxonomy as TaxNode[]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const homepage: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]

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

  return [...homepage, ...l1Routes, ...l2Routes, ...l3Routes]
}
