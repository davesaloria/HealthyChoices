// Product/recipe image fields are either a real photo (local path or an
// uploaded Supabase Storage URL) or a plain emoji used as a placeholder.
export function isImageUrl(value: string) {
  return value.startsWith('/') || value.startsWith('http')
}
