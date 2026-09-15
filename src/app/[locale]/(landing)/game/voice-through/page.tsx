import Image from 'next/image';
import { Mic, Music4, Target, RefreshCw, Users } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

import { GameHead, Section, ShotStrip, TileGrid } from '@/shared/blocks/voiceactinggame/sections';
import {
  JsonLd,
  breadcrumbSchema,
  videoGameSchema,
} from '@/shared/blocks/voiceactinggame/json-ld';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Voice Through | Play Games With Just Your Voice',
  description:
    'Play Voice Through, a voice-controlled music game: sing or hum to guide a ball through note walls, train your pitch, and follow your accuracy in the browser.',
  keywords:
    'voice through, voice controlled game, pitch training game, sing game, voice game',
  canonicalUrl: '/game/voice-through',
});
const screenshots = [
  { src: '/voiceactinggame/screenshot1.webp', alt: 'Voice Through Preview 1', width: 640, height: 360 },
  { src: '/voiceactinggame/screenshot2.webp', alt: 'Voice Through Preview 2', width: 640, height: 360 },
  { src: '/voiceactinggame/screenshot3.webp', alt: 'Voice Through Preview 3', width: 640, height: 360 },
];

const highlights = [
  'Innovative voice-controlled gameplay that responds to your pitch',
  'Progressive difficulty levels suitable for all skill levels',
  'Real-time feedback helps improve your vocal accuracy',
];

const features = [
  {
    icon: <Music4 size={18} aria-hidden="true" />,
    title: 'Vocal Training',
    body: 'Train your vocal pitch control while playing - sing higher or lower to move the ball.',
  },
  {
    icon: <Target size={18} aria-hidden="true" />,
    title: 'Game Challenges',
    body: 'Challenge yourself through walls that test different musical notes.',
  },
  {
    icon: <Users size={18} aria-hidden="true" />,
    title: 'For Everyone',
    body: 'Perfect for music lovers and aspiring singers of all ages - no experience needed.',
  },
  {
    icon: <Mic size={18} aria-hidden="true" />,
    title: 'Fun Practice',
    body: 'Turn vocal practice into an engaging gaming experience.',
  },
  {
    icon: <RefreshCw size={18} aria-hidden="true" />,
    title: 'Regular Updates',
    body: 'More exciting musical mini-games coming soon in regular updates.',
  },
];
export default async function VoiceThroughPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd
        data={videoGameSchema({
          name: 'Voice Through',
          description:
            'A voice-controlled music game: sing or hum to guide a ball through note walls and train your pitch.',
          slug: 'voice-through',
          genre: ['Music', 'Voice-controlled', 'Training'],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Voice Through', path: '/game/voice-through' },
        ])}
      />

      <section className="vag-wrap">
        <GameHead
          icon="/voiceactinggame/app-icon.webp"
          iconAlt="Voice Through app icon"
          title="Voice Through"
          subtitle="Play games with just your voice!"
          badges
          action={{
            label: 'Download Now',
            href: 'https://apps.apple.com/us/app/voice-through/id6738984292',
          }}
        />
      </section>
      <Section title="Collaborated with">
        <div className="vag-tile" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <Image
            src="/voiceactinggame/avatar.jpeg"
            alt="GamingFilterPro"
            width={72}
            height={72}
            style={{ borderRadius: 999, margin: '0 auto 12px', display: 'block' }}
          />
          <h3 className="vag-h3">
            <a href="https://www.tiktok.com/@gamingfilterpro" target="_blank" rel="noopener">
              @gamingfilterpro
            </a>
          </h3>
          <p>Creator of the viral #PerfectPitchChallenge</p>
          <p style={{ fontSize: 30, fontWeight: 800, color: '#0f172a', margin: '10px 0 0' }}>10B+</p>
          <p>Global views and trending worldwide</p>
        </div>
      </Section>

      <Section title="Game Screenshots">
        <ShotStrip shots={screenshots} />
      </Section>

      <Section
        title="Master Your Voice Through Gaming"
        lead="Master your pitch and train your voice as you sing your way through a series of note walls. Hit the perfect notes to guide a ball in this unique musical training game that makes practice fun."
      >
        <ul className="vag-hero-points" style={{ color: '#374151', maxWidth: 720, margin: '0 auto' }}>
          {highlights.map((item) => (
            <li key={item}>
              <Music4 size={16} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Key Features" variant="tint">
        <TileGrid columns={3} tiles={features} />
      </Section>
    </main>
  );
}