import { createClient } from '@/lib/supabase/client'

export interface AboutContent {
  heading: string
  subheading: string
  missionTitle: string
  missionParagraphs: string[]
  address: string
  hours: string
}

export const fallbackAboutContent: AboutContent = {
  heading: 'Our Story',
  subheading: 'Crafting wellness, one spoonful at a time — homemade in Naga, Cebu.',
  missionTitle: 'Our Mission',
  missionParagraphs: [
    'Healthy Choices started as a one-stop pantry for organic, natural, and wellness essentials — and grew around a simple idea: bring premium, homemade Greek yogurt to every table, made with real ingredients and no shortcuts.',
    'Every tub of CULTUR’D Greek yogurt is handcrafted in small batches, pure and unsweetened with no fillers. We’re not just making yogurt — we’re showing up, jar by jar, for your health.',
  ],
  address: 'Casa Mira South, Langtad, City of Naga, Cebu',
  hours: 'Open daily, 7:00 AM – 11:00 AM · Daily pick-ups available',
}

export async function getAboutContent(): Promise<AboutContent> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('site_content')
      .select('value')
      .eq('key', 'about')
      .maybeSingle()

    if (error || !data?.value) {
      return fallbackAboutContent
    }
    return { ...fallbackAboutContent, ...data.value } as AboutContent
  } catch {
    return fallbackAboutContent
  }
}
