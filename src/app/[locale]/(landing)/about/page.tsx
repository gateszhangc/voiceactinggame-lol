import { Mail, Music2, Sparkles, Users2 } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

import { Section, TileGrid } from '@/shared/blocks/voiceactinggame/sections';
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from '@/shared/blocks/voiceactinggame/json-ld';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'About Voice Acting Game | Voice-Controlled Games Studio',
  description:
    'Voice Acting Game builds voice-controlled games: a browser dub studio, pitch and rhythm challenges, a screaming chicken, and a T-Rex you steer with your voice.',
  keywords:
    'about voice acting game, voice game studio, voice controlled games, gamingfilterpro',
  canonicalUrl: '/about',
});

const story = [
  {
    icon: <Music2 size={18} aria-hidden="true" />,
    title: 'Our Story',
    body: 'Voice Through started from a simple idea - what if we could make voice training fun? Traditional vocal practice felt boring, so we built games you control with your voice: sing high notes to move up, low notes to move down. The idea came from watching people try to match pitch in karaoke and thinking this could be a game.',
  },
  {
    icon: <Sparkles size={18} aria-hidden="true" />,
    title: 'What Makes It Special',
    body: 'Unlike other music games where you just tap the screen, Voice Through helps you improve your singing. We teamed up with GamingFilterPro, the creator of viral TikTok pitch challenges, to design levels that are fun and effective. Beginners and experienced singers both find challenges at their level, and you can practice with your normal speaking voice.',
  },
];
const contact = [
  {
    icon: <Mail size={18} aria-hidden="true" />,
    title: 'Email Us',
    body: 'hi@voiceactinggame.lol',
  },
  {
    icon: <Users2 size={18} aria-hidden="true" />,
    title: 'Follow Us',
    body: '@gamingfilterpro on TikTok',
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd
        data={webPageSchema({
          name: 'About Voice Acting Game',
          description:
            'Who builds voice-controlled games like the Choicer Voicer dub studio, Vocal Range Test, Scream Chicken, and the voice-controlled Dino Run.',
          path: '/about',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      <section className="vag-wrap">
        <div className="vag-home-head">
          <h1 className="vag-home-title">About Voice Acting Game</h1>
          <p className="vag-home-sub">
            Games you play with nothing but your voice
          </p>
        </div>
      </section>

      <Section>
        <TileGrid columns={2} tiles={story} />
      </Section>

      <Section title="Get in Touch" variant="tint">
        <TileGrid columns={2} tiles={contact} />
      </Section>

      <section className="vag-closing">
        <p>Thanks for playing! Your support means the world to us.</p>
      </section>
    </main>
  );
}