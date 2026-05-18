export const slugify = (text: string) =>
  text.toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+|-+$/g, '')

export const uniqueSlug = (text: string) =>
  `${slugify(text)}-${Date.now().toString(36)}`
