export interface Interpretation {
  source: string
  text: string
}

export interface BlogPost {
  slug: string
  titleAr: string
  date: string
  category: string
  youtubeUrl: string
  youtubeId: string | null
  thumbnailUrl: string
  excerpt: string
  content: string
  metaTitle: string
  metaDescription: string
}

export interface Dream {
  slug: string
  title: string
  category: string
  summary: string
  interpretations: Interpretation[]
  related: string[]
  metaTitle: string
  metaDescription: string
}
