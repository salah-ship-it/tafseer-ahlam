export interface Interpretation {
  source: string
  text: string
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
