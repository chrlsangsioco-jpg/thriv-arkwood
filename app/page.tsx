import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import type { LandingContent } from '@/lib/content'
import { SiteRenderer, type Testimonial } from '@/components/SiteRenderer'

// Re-fetch published content at most once a minute (publishing appears quickly).
export const revalidate = 60

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!
const SLUG = process.env.NEXT_PUBLIC_CLIENT_SLUG!
const THRIVBOT = process.env.NEXT_PUBLIC_THRIVBOT_URL ?? ''

async function getData(): Promise<{ content: LandingContent | null; testimonials: Testimonial[] }> {
  const { data: page } = await supabase
    .from('landing_pages').select('published').eq('client_id', CLIENT_ID).eq('is_published', true).maybeSingle()
  const pub = page?.published as LandingContent | undefined
  const content = pub && pub.business ? pub : null

  const { data: t } = await supabase
    .from('testimonials')
    .select('id, author_name, author_location, quote, rating, avatar_url')
    .eq('client_id', CLIENT_ID).eq('is_active', true).order('sort_order', { ascending: true })

  return { content, testimonials: (t ?? []) as Testimonial[] }
}

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getData()
  if (!content) return { title: 'Coming soon' }
  const img = content.hero.image ? [content.hero.image] : []
  return {
    title: content.seo.title || content.business.name,
    description: content.seo.description,
    keywords: content.seo.keywords || undefined,
    openGraph: { title: content.seo.title || content.business.name, description: content.seo.description, images: img, type: 'website' },
  }
}

export default async function Page() {
  const { content, testimonials } = await getData()

  if (!content) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#F7F2EA', color: '#2B2420' }}>
        <p style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 24 }}>Coming soon.</p>
      </div>
    )
  }

  const b = content.business
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: b.name,
    description: content.seo.description || undefined,
    telephone: b.phone || undefined,
    address: b.address || undefined,
    areaServed: b.serviceArea || undefined,
    image: content.hero.image || undefined,
    priceRange: '₱₱',
  }

  return (
    <>
      <SiteRenderer content={content} testimonials={testimonials} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {THRIVBOT && <script src={`${THRIVBOT}/widget.js`} data-client={SLUG} data-color={content.theme.accent} async />}
    </>
  )
}
