import { Layers, Mic, Share2, Sparkles } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

import {
  GameHead,
  NumberedSteps,
  Section,
  ShotStrip,
  TileGrid,
} from '@/shared/blocks/voiceactinggame/sections';
import {
  JsonLd,
  breadcrumbSchema,
  videoGameSchema,
} from '@/shared/blocks/voiceactinggame/json-ld';
import { getMetadata } from '@/shared/lib/seo';

const APP_URL = 'https://apps.apple.com/us/app/say-the-word-on-beat/id6756302371';

export const generateMetadata = getMetadata({
  title: 'Say the Word on Beat | Rhythm Voice Game',
  description:
    'Play Say the Word on Beat: rhyming words appear on the beat and you have to say them exactly on time. Five difficulty levels, custom rhyme packs, and instant sharing.',
  keywords:
    'say the word on beat, rhythm voice game, tongue twister game, beat game, voice controlled game',
  canonicalUrl: '/game/say-the-word-on-beat',
});

const shots = [1, 2, 3, 4].map((n) => ({
  src: '/voiceactinggame/say-on-beat-preview-' + n + '.jpg',
  alt: 'Say the Word on Beat gameplay ' + n,
  width: 640,
  height: 360,
}));

const features = [
  {
    icon: <Layers size={18} aria-hidden="true" />,
    title: '5 Difficulty Levels',
    body: 'From easy warmups to insane challenges, so every run matches your timing.',
  },
  {
    icon: <Sparkles size={18} aria-hidden="true" />,
    title: 'Custom Rhyme Packs',
    body: 'Create your own word combinations and share them with friends.',
  },
  {
    icon: <Mic size={18} aria-hidden="true" />,
    title: 'Catchy Beats',
    body: 'Viral-inspired rhythmic tracks that make every line a performance.',
  },
  {
    icon: <Share2 size={18} aria-hidden="true" />,
    title: 'Instant Sharing',
    body: 'Record and share your best fails straight from the game.',
  },
];

const steps = [
  {
    index: '1',
    title: 'Watch the symbols',
    body: 'Rhyming words appear synced to the beat.',
  },
  {
    index: '2',
    title: 'Say it on time',
    body: 'Speak each word exactly when it hits.',
  },
  {
    index: '3',
    title: 'Do not slip up',
    body: 'The rhymes will twist your tongue.',
  },
];
export default async function SayTheWordOnBeatPage({
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
          name: 'Say the Word on Beat',
          description:
            'A rhythm voice game: say each rhyming word exactly when it hits the beat.',
          slug: 'say-the-word-on-beat',
          genre: ['Music', 'Rhythm', 'Voice-controlled'],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Say the Word on Beat', path: '/game/say-the-word-on-beat' },
        ])}
      />

      <section className="vag-wrap">
        <GameHead
          icon="/voiceactinggame/say-on-beat-app-icon.jpg"
          iconAlt="Say the Word on Beat app icon"
          title="Say the Word on Beat"
          subtitle="Say each word exactly when it hits the beat. Sounds easy? Your tongue disagrees."
          action={{ label: 'Download Free', href: APP_URL }}
        />
      </section>

      <Section title="Gameplay">
        <ShotStrip shots={shots} hint="Swipe to see more gameplay" />
      </Section>

      <Section title="Features" variant="cream">
        <TileGrid columns={2} tiles={features} />
      </Section>

      <NumberedSteps title="How to Play" steps={steps} />
    </main>
  );
}
