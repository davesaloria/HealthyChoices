import { createClient } from '@/lib/supabase/server'
import { fallbackAboutContent, type AboutContent } from '@/lib/get-site-content'
import { updateAboutContent } from './actions'
import { Button } from '@/components/ui/Button'

export default async function AdminAboutPage({
  searchParams,
}: {
  searchParams: { saved?: string }
}) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('site_content')
    .select('value')
    .eq('key', 'about')
    .maybeSingle()

  const content: AboutContent = { ...fallbackAboutContent, ...(data?.value ?? {}) }

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">About Page</h1>
      <p className="text-charcoal-600 mb-8">
        Edit the text shown on your public About page.
      </p>

      {searchParams.saved && (
        <div className="mb-6 p-3 rounded-lg bg-primary-50 border border-primary-200 text-primary-700 text-sm max-w-xl">
          Saved! Your About page has been updated.
        </div>
      )}

      <form
        action={updateAboutContent}
        className="space-y-5 max-w-xl bg-white rounded-2xl border border-charcoal-100 p-6"
      >
        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
            Page heading
          </label>
          <input
            name="heading"
            defaultValue={content.heading}
            required
            className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
            Subheading
          </label>
          <input
            name="subheading"
            defaultValue={content.subheading}
            required
            className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
            Mission section title
          </label>
          <input
            name="missionTitle"
            defaultValue={content.missionTitle}
            required
            className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
            Mission paragraph 1
          </label>
          <textarea
            name="missionParagraph1"
            defaultValue={content.missionParagraphs[0]}
            rows={3}
            className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
            Mission paragraph 2
          </label>
          <textarea
            name="missionParagraph2"
            defaultValue={content.missionParagraphs[1]}
            rows={3}
            className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">Address</label>
          <input
            name="address"
            defaultValue={content.address}
            required
            className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">Hours</label>
          <input
            name="hours"
            defaultValue={content.hours}
            required
            className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </div>

        <Button type="submit" size="lg" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  )
}
