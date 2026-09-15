import {
  Gamepad2,
  Globe2,
  Palette,
  Share2,
  Smartphone,
  TowerControl,
  Trophy,
  Volume1,
  Volume2,
} from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

import {
  CtaBand,
  GameHead,
  PlatformsRow,
  ReviewsSection,
  Section,
  ShotStrip,
  StepPanels,
  TileGrid,
} from '@/shared/blocks/voiceactinggame/sections';
import {
  JsonLd,
  breadcrumbSchema,
  videoGameSchema,
} from '@/shared/blocks/voiceactinggame/json-ld';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Scream Chicken! Run | Voice-Controlled Chicken Game',
  description:
    'Play Scream Chicken! Run: use a soft voice to walk and a loud scream to jump. Four game modes, global leaderboards, and voice-controlled chaos in the browser.',
  keywords:
    'scream chicken, scream chicken run, voice controlled game, chicken game, scream game',
  canonicalUrl: '/game/scream-chicken',
});
const shots = [1, 2, 3, 4, 5].map((n) => ({
  src: '/voiceactinggame/scream-chicken-' + n + '.jpg',
  alt: 'Scream Chicken! Run screenshot ' + n,
  width: 640,
  height: 360,
}));

const modes = [
  {
    icon: <Gamepad2 size={18} aria-hidden="true" />,
    title: 'Classic Mode',
    body: 'Navigate through obstacles using your voice control.',
  },
  {
    icon: <Globe2 size={18} aria-hidden="true" />,
    title: 'Flappy Chicken',
    body: 'Flappy Bird style gameplay with voice control.',
  },
  {
    icon: <Trophy size={18} aria-hidden="true" />,
    title: 'Do Re Mi Challenge',
    body: 'Musical pitch challenges to test your vocal range.',
  },
  {
    icon: <TowerControl size={18} aria-hidden="true" />,
    title: 'Tower Jump',
    body: 'Jump up towers with precise voice control.',
  },
];

const features = [
  {
    icon: <Volume1 size={18} aria-hidden="true" />,
    title: 'Voice Control',
    body: 'Unique voice-controlled gameplay - soft voice to walk, loud scream to jump.',
  },
  {
    icon: <Gamepad2 size={18} aria-hidden="true" />,
    title: 'Multiple Game Modes',
    body: 'Classic, Flappy Chicken, Do Re Mi Challenge, and Tower Jump modes.',
  },
  {
    icon: <Trophy size={18} aria-hidden="true" />,
    title: 'Global Leaderboards',
    body: 'Compete with players worldwide and climb the leaderboards.',
  },
];
features.push(
  {
    icon: <Share2 size={18} aria-hidden="true" />,
    title: 'Record & Share',
    body: 'Record your chicken scream moments and share them with friends.',
  },
  {
    icon: <Smartphone size={18} aria-hidden="true" />,
    title: 'Multi-Platform Support',
    body: 'Available on iPhone, iPad, iPod touch, Mac, and Apple Vision Pro.',
  },
  {
    icon: <Palette size={18} aria-hidden="true" />,
    title: 'Achievements & Skins',
    body: 'Unlock new chicken skins and achievements as you progress.',
  }
);

const reviews = [
  {
    name: 'ChickenFan29',
    initial: 'C29',
    text: 'I could make that chicken into fried chicken or chicken nuggets. Just kidding, I love that chicken. He opens his mouth when you talk and goes BOK when you scream. Really entertaining if you are bored.',
  },
  {
    name: 'Ava brown',
    initial: 'AB',
    text: 'Love it. The voice control actually works and the chicken is hilarious.',
  },
  {
    name: 'GameLover',
    initial: 'GL',
    text: 'Amazing voice-controlled game! So much fun and really addictive. The chicken character is hilarious and the gameplay is super creative. Highly recommend!',
  },
];

const steps = [
  {
    icon: <Volume1 size={26} aria-hidden="true" />,
    title: 'Soft Voice = Walk',
    body: 'Use a gentle voice to make the chicken walk forward.',
    tone: 'rose' as const,
  },
  {
    icon: <Volume2 size={26} aria-hidden="true" />,
    title: 'Loud Scream = Jump',
    body: 'Scream loudly to make the chicken jump over obstacles.',
    tone: 'amber' as const,
  },
];

const platforms = ['iPhone', 'iPad', 'iPod touch', 'Mac', 'Apple Vision Pro'].map((label) => ({
  icon: <Smartphone size={22} aria-hidden="true" />,
  label,
}));
export default async function ScreamChickenPage({
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
          name: 'Scream Chicken! Run',
          description:
            'A voice-controlled chicken runner: whisper to walk, scream to jump, and clear four game modes.',
          slug: 'scream-chicken',
          genre: ['Casual', 'Voice-controlled', 'Runner'],
          rating: '4.6',
          reviewCount: '437',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Scream Chicken! Run', path: '/game/scream-chicken' },
        ])}
      />

      <section className="vag-wrap">
        <GameHead
          icon="/voiceactinggame/scream-chicken-icon-square.webp"
          iconAlt="Scream Chicken! Run app icon"
          title="Scream Chicken! Run"
          subtitle="Control with your voice!"
          badges
          rating={{ score: '4.6/5', count: '437 reviews' }}
        />
      </section>
      <Section title="Game Screenshots">
        <ShotStrip shots={shots} hint="Swipe to see more screenshots" />
      </Section>

      <Section title="Game Modes" variant="cream">
        <TileGrid columns={2} tiles={modes} />
      </Section>

      <Section title="Key Features">
        <TileGrid columns={3} tiles={features} />
      </Section>

      <ReviewsSection
        title="What Players Say"
        score="4.6"
        count="Based on 437 reviews"
        reviews={reviews}
      />

      <StepPanels title="How to Play" steps={steps} />

      <PlatformsRow title="Available Platforms" items={platforms} />

      <CtaBand
        title="Ready to Scream?"
        body="Join millions of players in this hilarious voice-controlled adventure!"
      />
    </main>
  );
}