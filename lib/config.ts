export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tafseer-ahlam.com'

export const SITE_NAME = 'تفسير الأحلام'
export const SITE_DESCRIPTION =
  'تفسير أحلامك بدقة وأمانة بحسب ابن سيرين والنابلسي والعلماء الكبار'

export const CATEGORIES = [
  { name: 'الحيوانات', icon: '🦁', slug: 'الحيوانات' },
  { name: 'الماء', icon: '💧', slug: 'الماء' },
  { name: 'الزواج', icon: '💍', slug: 'الزواج' },
  { name: 'المال', icon: '🌟', slug: 'المال' },
  { name: 'الأماكن', icon: '🕌', slug: 'الأماكن' },
  { name: 'الموت', icon: '🌙', slug: 'الموت' },
  { name: 'الظواهر', icon: '✨', slug: 'الظواهر' },
  { name: 'الجسد', icon: '🫀', slug: 'الجسد' },
] as const
