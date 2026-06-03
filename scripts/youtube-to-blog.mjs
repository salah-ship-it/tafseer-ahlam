#!/usr/bin/env node
/**
 * YouTube → Blog pipeline for tafseer-ahlam.com
 *
 * Usage:
 *   node scripts/youtube-to-blog.mjs <youtube-url-or-video-id>
 *
 * Examples:
 *   node scripts/youtube-to-blog.mjs https://www.youtube.com/watch?v=VIDEO_ID
 *   node scripts/youtube-to-blog.mjs https://youtu.be/VIDEO_ID
 *   node scripts/youtube-to-blog.mjs VIDEO_ID
 *
 * What it does:
 *   1. Extracts the video ID from the input
 *   2. Fetches title + thumbnail via YouTube oEmbed (no API key needed)
 *   3. Attempts to fetch the video description from the og:description meta tag
 *   4. Generates a Latin slug from the Arabic title
 *   5. Writes data/blog/<slug>.json — edit the "content" field for best results
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BLOG_DIR = join(__dirname, '..', 'data', 'blog')

// ─── helpers ────────────────────────────────────────────────────────────────

function extractVideoId(input) {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /\/shorts\/([a-zA-Z0-9_-]{11})/,
    /\/embed\/([a-zA-Z0-9_-]{11})/,
  ]
  for (const re of patterns) {
    const m = input.match(re)
    if (m) return m[1]
  }
  if (/^[a-zA-Z0-9_-]{11}$/.test(input.trim())) return input.trim()
  return null
}

// Arabic → Latin transliteration for URL-safe slugs
const AR = {
  'ا':'a','أ':'a','إ':'i','آ':'a','ب':'b','ت':'t','ث':'th','ج':'j',
  'ح':'h','خ':'kh','د':'d','ذ':'dh','ر':'r','ز':'z','س':'s','ش':'sh',
  'ص':'s','ض':'d','ط':'t','ظ':'z','ع':'a','غ':'gh','ف':'f','ق':'q',
  'ك':'k','ل':'l','م':'m','ن':'n','ه':'h','و':'w','ي':'y','ى':'a',
  'ة':'a','ء':'','ئ':'y','ؤ':'w',
  // common diacritics — strip silently
  'ً':'','ٌ':'','ٍ':'','َ':'','ُ':'',
  'ِ':'','ّ':'','ْ':'',
}

function toSlug(arabicTitle, videoId) {
  const latin = arabicTitle
    .split('')
    .map(ch => AR[ch] ?? (/[a-z0-9]/i.test(ch) ? ch.toLowerCase() : ' '))
    .join('')
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 55)

  return latin.replace(/-/g, '').length >= 3 ? latin : `video-${videoId}`
}

async function fetchOEmbed(videoUrl) {
  const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) })
  if (!res.ok) throw new Error(`oEmbed failed: HTTP ${res.status}`)
  return res.json()
}

// YouTube oEmbed does not include the video description.
// We scrape the og:description meta tag from the watch page instead.
async function fetchDescription(videoUrl) {
  try {
    const res = await fetch(videoUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' },
      signal: AbortSignal.timeout(12_000),
    })
    if (!res.ok) return null
    const html = await res.text()
    // og:description appears before the page scripts so this is reliable
    const m =
      html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/) ??
      html.match(/<meta\s+name="description"\s+content="([^"]+)"/)
    if (!m) return null
    return m[1]
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim()
  } catch {
    return null
  }
}

// ─── content generators ──────────────────────────────────────────────────────

function makeExcerpt(title, description) {
  if (description && description.length > 30) {
    // Take up to the first two sentences from the description
    const sentences = description.split(/(?<=[.،؟!])\s+/).filter(s => s.length > 10)
    if (sentences.length >= 2) return sentences.slice(0, 2).join(' ').slice(0, 220)
    return description.slice(0, 220)
  }
  return `يتناول هذا المقال تفسير "${title}" من منظور علم الأحلام وفق ما أورده العلماء المسلمون. نستعرض فيه أبرز ما ذكره ابن سيرين والنابلسي في هذا الشأن.`
}

function makeContent(title, description) {
  const parts = []

  parts.push(
    `تُعدّ رؤية الأحلام نافذةً رحبة على عالم الرمز والدلالة، وقد اهتمّ بها العلماء المسلمون اهتمامًا بالغًا منذ القدم. ويأتي موضوع "${title}" في مقدمة الرؤى التي يُكثر الناس السؤال عنها.`
  )

  if (description && description.length > 50) {
    parts.push(description)
  }

  parts.push(
    `يُشير الشيخ إسماعيل الجابري في هذا الموضوع إلى ضرورة الرجوع إلى المصادر المعتمدة في علم تفسير الرؤى، وفي مقدمتها كتاب "تفسير الأحلام الكبير" للإمام ابن سيرين، و"تعطير الأنام في تعبير المنام" للنابلسي.`,
    `إن فهم دلالات أي رؤيا يستلزم مراعاة جملة من العوامل المتشابكة؛ أبرزها: حالة الرائي النفسية والصحية، والسياق العام الذي ظهرت فيه الرؤيا، والتفاصيل المصاحبة لها من ألوان وأشخاص وأماكن.`,
    `وقد قرّر علماء التفسير أن الرؤى الصادقة — وهي التي تصدر عن النفس المطمئنة — تتميز بوضوح صورتها وترتيب أحداثها وبقاء أثرها في الوجدان بعد الاستيقاظ. أما الأضغاث فهي أحلام مضطربة لا تقبل التأويل في الغالب.`,
    `ومن الأهمية بمكان أن يعلم القارئ أن تفسير الأحلام علمٌ ظني اجتهادي، وأن العلماء اختلفوا في دلالات كثير من الرموز اختلافًا واسعًا؛ لذا ينبغي أخذ أي تفسير بحذر، وعدم البناء عليه قرارات جوهرية في الحياة.`,
    `وفيما يخص موضوع "${title}" تحديدًا، فقد جمع الشيخ إسماعيل الجابري خلاصة ما أورده المفسرون الكبار من أقوال وروايات، مُقدِّمًا إياها بأسلوب مبسَّط يُراعي المستوى المعرفي للمشاهد العربي، مع الحرص الدائم على الأمانة في النقل والتوثيق.`,
    `ونوصي كل من أصابه قلق بسبب رؤيا ما أن يحمد الله ويستعيذ به، وألا يحدث بها أحدًا إن كانت مزعجة، وأن يتصدق ويدعو بالخير؛ فذلك مما تواترت به الأحاديث النبوية الشريفة في باب آداب الرؤيا.`
  )

  return parts.join('\n\n')
}

// ─── main ────────────────────────────────────────────────────────────────────

async function main() {
  const input = process.argv[2]
  if (!input) {
    console.error('\nUsage: node scripts/youtube-to-blog.mjs <youtube-url-or-video-id>\n')
    process.exit(1)
  }

  const videoId = extractVideoId(input)
  if (!videoId) {
    console.error(`\nCould not extract a valid YouTube video ID from: ${input}\n`)
    process.exit(1)
  }

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
  console.log(`\n── YouTube → Blog Pipeline ──────────────────────`)
  console.log(`Video : ${videoUrl}`)

  process.stdout.write('Fetching oEmbed metadata … ')
  const oembed = await fetchOEmbed(videoUrl)
  console.log('done')
  console.log(`Title : ${oembed.title}`)

  process.stdout.write('Fetching video description … ')
  const description = await fetchDescription(videoUrl)
  console.log(description ? `done (${description.length} chars)` : 'not available')

  const slug = toSlug(oembed.title, videoId)
  const today = new Date().toISOString().slice(0, 10)

  /** @type {import('../lib/types.js').BlogPost} */
  const article = {
    slug,
    titleAr: oembed.title,
    date: today,
    category: 'تفسير الأحلام',
    youtubeUrl: videoUrl,
    youtubeId: videoId,
    thumbnailUrl: oembed.thumbnail_url ?? '',
    excerpt: makeExcerpt(oembed.title, description),
    content: makeContent(oembed.title, description),
    metaTitle: oembed.title.slice(0, 55),
    metaDescription: (description ?? oembed.title).slice(0, 150),
  }

  mkdirSync(BLOG_DIR, { recursive: true })
  const outPath = join(BLOG_DIR, `${slug}.json`)
  writeFileSync(outPath, JSON.stringify(article, null, 2) + '\n', 'utf-8')

  console.log(`\n✓  Saved → data/blog/${slug}.json`)
  console.log(`   Live at → /blog/${slug}`)
  console.log('\nTip: Edit the "content" field in the JSON for a hand-crafted article.\n')
}

main().catch(err => {
  console.error('\nError:', err.message)
  process.exit(1)
})
