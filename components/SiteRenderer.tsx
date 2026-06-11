// The public landing page rendered from LandingContent. Kept in sync with the
// ThrivBOT editor's preview component so "what you edit" = "what visitors see".
import type { LandingContent } from '@/lib/content'

export interface Testimonial {
  id: string
  author_name: string
  author_location?: string | null
  quote: string
  rating?: number | null
  avatar_url?: string | null
}

const PALETTE = {
  bg: '#F7F2EA',
  surface: '#FBF8F2',
  text: '#2B2420',
  muted: '#8A7B68',
  border: '#E7DCC9',
}

function Stars({ n = 5, color }: { n?: number; color: string }) {
  return (
    <div className="flex gap-0.5" style={{ color }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ opacity: i < n ? 1 : 0.25 }}>★</span>
      ))}
    </div>
  )
}

export function SiteRenderer({
  content,
  testimonials = [],
}: {
  content: LandingContent
  testimonials?: Testimonial[]
}) {
  const a = content.theme?.accent || '#A47551'
  const { business: b, hero, promo, services, about, gallery, process, contact } = content

  return (
    <div style={{ background: PALETTE.bg, color: PALETTE.text }} className="min-h-screen font-sans">
      {/* Promo banner */}
      {promo?.active && promo.text && (
        <div className="px-4 py-2 text-center text-sm font-medium text-white" style={{ background: a }}>
          {promo.text}
          {promo.code && <span className="ml-2 rounded bg-white/20 px-2 py-0.5 font-semibold">{promo.code}</span>}
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-2">
          {b.logoUrl ? (
            <img src={b.logoUrl} alt={b.name} className="h-8 w-auto" />
          ) : (
            <span className="font-serif text-xl font-semibold tracking-tight">{b.name}</span>
          )}
        </div>
        <nav className="hidden items-center gap-8 text-sm md:flex" style={{ color: PALETTE.muted }}>
          <a href="#services" className="hover:opacity-70">Services</a>
          <a href="#gallery" className="hover:opacity-70">Gallery</a>
          <a href="#process" className="hover:opacity-70">Process</a>
          <a href="#contact" className="hover:opacity-70">Contact</a>
        </nav>
        <a href="#contact" className="rounded-full px-5 py-2 text-sm font-semibold text-white" style={{ background: a }}>
          {hero.ctaLabel || 'Get a Quote'}
        </a>
      </header>

      {/* Hero */}
      <section className="grid items-center gap-12 px-6 py-14 md:grid-cols-2 md:px-12 md:py-24">
        <div>
          <h1 className="font-serif text-[2.6rem] font-semibold leading-[1.05] tracking-tight md:text-6xl">{hero.heading}</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed" style={{ color: PALETTE.muted }}>{hero.subheading}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className="rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-lg" style={{ background: a }}>
              {hero.ctaLabel || 'Get a Free Quote'}
            </a>
            {b.phone && (
              <a href={`tel:${b.phone}`} className="rounded-full border px-6 py-3.5 text-base font-medium" style={{ borderColor: PALETTE.border }}>
                📞 {b.phone}
              </a>
            )}
          </div>
          {b.serviceArea && <p className="mt-6 text-sm" style={{ color: PALETTE.muted }}>Serving {b.serviceArea}</p>}
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-3xl" style={{ background: PALETTE.border }}>
          {hero.image ? (
            <img src={hero.image} alt={b.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm" style={{ color: PALETTE.muted }}>Hero image</div>
          )}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 py-16 md:px-12 md:py-20" style={{ background: PALETTE.surface }}>
        <h2 className="font-serif text-3xl font-semibold md:text-4xl">{services.heading}</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((s, i) => (
            <div key={i} className="rounded-2xl border p-7" style={{ borderColor: PALETTE.border, background: PALETTE.bg }}>
              <div className="grid h-11 w-11 place-items-center rounded-full text-white" style={{ background: a }}>✦</div>
              <h3 className="mt-5 font-serif text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed" style={{ color: PALETTE.muted }}>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      {(about.heading || about.body) && (
        <section className="grid items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-12">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl order-2 md:order-1" style={{ background: PALETTE.border }}>
            {about.image
              ? <img src={about.image} alt={about.heading} className="h-full w-full object-cover" />
              : <div className="flex h-full items-center justify-center text-sm" style={{ color: PALETTE.muted }}>Image</div>}
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">{about.heading}</h2>
            <p className="mt-5 text-lg leading-relaxed" style={{ color: PALETTE.muted }}>{about.body}</p>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.images.length > 0 && (
        <section id="gallery" className="px-6 py-16 md:px-12 md:py-20" style={{ background: PALETTE.surface }}>
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">{gallery.heading}</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
            {gallery.images.map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-2xl" style={{ background: PALETTE.border }}>
                <img src={img.url} alt={img.alt || gallery.heading} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Process */}
      {process.steps.length > 0 && (
        <section id="process" className="px-6 py-20 md:px-12">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">{process.heading}</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((s, i) => (
              <div key={i}>
                <div className="grid h-11 w-11 place-items-center rounded-full font-semibold text-white" style={{ background: a }}>{i + 1}</div>
                <h3 className="mt-4 font-serif text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: PALETTE.muted }}>{s.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="px-6 py-16 md:px-12 md:py-20" style={{ background: PALETTE.surface }}>
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">What our clients say</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-2xl border p-7" style={{ borderColor: PALETTE.border, background: PALETTE.bg }}>
                <Stars n={t.rating ?? 5} color={a} />
                <p className="mt-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  {t.avatar_url && <img src={t.avatar_url} alt={t.author_name} className="h-9 w-9 rounded-full object-cover" />}
                  <div>
                    <p className="text-sm font-semibold">{t.author_name}</p>
                    {t.author_location && <p className="text-xs" style={{ color: PALETTE.muted }}>{t.author_location}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="px-6 py-20 text-center md:px-12">
        <h2 className="font-serif text-3xl font-semibold md:text-5xl">{contact.heading}</h2>
        <p className="mx-auto mt-4 max-w-md text-lg" style={{ color: PALETTE.muted }}>{contact.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {b.phone && <a href={`tel:${b.phone}`} className="rounded-full px-7 py-3.5 font-semibold text-white" style={{ background: a }}>📞 Call {b.phone}</a>}
          {b.facebook && <a href={b.facebook} className="rounded-full border px-7 py-3.5 font-medium" style={{ borderColor: PALETTE.border }}>Message on Facebook</a>}
        </div>
        <div className="mt-7 text-sm" style={{ color: PALETTE.muted }}>
          {b.address && <p>{b.address}</p>}
          {b.hours && <p>{b.hours}</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-10 text-center text-sm md:px-12" style={{ borderColor: PALETTE.border, color: PALETTE.muted }}>
        © {new Date().getFullYear()} {b.name}. {b.serviceArea && `Serving ${b.serviceArea}.`}
      </footer>
    </div>
  )
}
