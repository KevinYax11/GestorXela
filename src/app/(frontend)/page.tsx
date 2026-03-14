import { getPayload } from 'payload'
import config from '@payload-config'
import { HeroSection } from '@/components/frontend/HeroSection'
import { AboutSection } from '@/components/frontend/AboutSection'
import { ConferenceSection } from '@/components/frontend/ConferenceSection'
import { ThematicAreasSection } from '@/components/frontend/ThematicAreasSection'
import { EventsSection } from '@/components/frontend/EventsSection'
import { NewsSection } from '@/components/frontend/NewsSection'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Phase 4: Fetch next 3 upcoming published events
  const eventsResult = await payload.find({
    collection: 'events',
    where: { status: { equals: 'published' } },
    limit: 3,
    sort: '-eventDate',
    overrideAccess: false,
  })

  const newsResult = await payload.find({
    collection: 'news',
    where: { status: { equals: 'published' } },
    limit: 3,
    sort: '-publishedAt',
    overrideAccess: false,
  })

  // TODO Phase 6: Fetch homepage data from Payload Globals
  // const homepage = await payload.findGlobal({ slug: 'homepage', depth: 1 })
  // const partners = await payload.findGlobal({ slug: 'partners', depth: 1 })
  // const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })
  {
    ;[]
  }
  return (
    <>
      {/* Hero Section - Main banner with CTA buttons */}
      <HeroSection />

      {/* About Us Section - Who we are, mission, strategic partners */}
      <AboutSection />

      {/* TODO: DELETE, kept just for reference */}
      {/* <ConferenceSection /> */}

      {/* TODO: DELETE, kept just for reference */}
      {/* <ThematicAreasSection /> */}

      {/* Upcoming Events Section */}
      <EventsSection events={eventsResult.docs} />

      {/* Latest News Section */}
      <NewsSection news={newsResult.docs} />

      {/* TODO Phase 5: Add Opinion Articles section if needed */}
      {/* TODO Phase 6: Add Contact section */}
    </>
  )
}
