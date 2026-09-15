import {
  BrainCircuit,
  Eye,
  GraduationCap,
  LineChart,
  Mic,
  Smartphone,
  Sparkles,
  Volume1,
} from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

import {
  CtaBand,
  GameHead,
  PlatformsRow,
  ReviewsSection,
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

export const generateMetadata = getMetadata({
  title: 'Mandarin Challenge | Learn Mandarin With Your Voice',
  description:
    'Play Mandarin Challenge: pronounce Mandarin phrases to clear obstacles, match pinyin with images, and build speaking confidence in a voice-controlled learning game.',
  keywords:
    'mandarin challenge, learn mandarin game, speak mandarin, voice recognition game, language learning game',
  canonicalUrl: '/game/mandarin-challenge',
});
const APP_URL = 'https://apps.apple.com/us/app/mandarin-challenge/id6741360584';

const shots = [1, 2, 3, 4, 5].map((n) => ({
  src: '/voiceactinggame/mandarin-challenge-' + n + '.jpg',
  alt: 'Mandarin Challenge screenshot ' + n,
  width: 640,
  height: 360,
}));

const howItWorks = [
  {
    icon: <Mic size={18} aria-hidden="true" />,
    title: 'Speak Mandarin',
    body: 'Pronounce Mandarin phrases correctly to clear obstacles in your path.',
  },
  {
    icon: <Sparkles size={18} aria-hidden="true" />,
    title: 'Clear Obstacles',
    body: 'Use voice recognition to match pinyin with images and progress through levels.',
  },
  {
    icon: <GraduationCap size={18} aria-hidden="true" />,
    title: 'Master Mandarin',
    body: 'Build confidence in speaking Mandarin through engaging gameplay.',
  },
];

const features = [
  {
    icon: <Volume1 size={18} aria-hidden="true" />,
    title: 'Voice Recognition',
    body: 'Real-time voice recognition technology for accurate pronunciation feedback.',
  },
  {
    icon: <BrainCircuit size={18} aria-hidden="true" />,
    title: 'Interactive Learning',
    body: 'A game-based learning approach that makes language practice engaging and fun.',
  },
  {
    icon: <Eye size={18} aria-hidden="true" />,
    title: 'Visual Association',
    body: 'Learn with images and visual cues to improve memory and comprehension.',
  },
  {
    icon: <Sparkles size={18} aria-hidden="true" />,
    title: 'Game-Based Learning',
    body: 'Progress through levels and overcome challenges while learning Mandarin.',
  },
  {
    icon: <Mic size={18} aria-hidden="true" />,
    title: 'Speaking Practice',
    body: 'Focus on building speaking confidence with immediate feedback.',
  },
  {
    icon: <LineChart size={18} aria-hidden="true" />,
    title: 'Progress Tracking',
    body: 'Track your learning progress and see improvement over time.',
  },
];

const reviews = [
  {
    name: 'Language Learner',
    initial: 'LL',
    text: 'Fun game to play! Great way to practice Mandarin pronunciation.',
  },
  {
    name: 'Jessica Chen',
    initial: 'JC',
    text: 'Great idea! Speaking-based learning is so much more effective than just reading.',
  },
  {
    name: 'Student Mike',
    initial: 'SM',
    text: 'So fun! Need more levels! This makes learning Mandarin actually enjoyable.',
  },
];

const platforms = ['iPhone', 'iPad', 'iPod touch', 'Mac', 'Apple Vision Pro'].map((label) => ({
  icon: <Smartphone size={22} aria-hidden="true" />,
  label,
}));
export default async function MandarinChallengePage({
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
          name: 'Mandarin Challenge',
          description:
            'A voice-controlled Mandarin learning game: pronounce phrases to clear obstacles and match pinyin with images.',
          slug: 'mandarin-challenge',
          genre: ['Educational', 'Voice-controlled', 'Language'],
          rating: '4.3',
          reviewCount: '23',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Mandarin Challenge', path: '/game/mandarin-challenge' },
        ])}
      />

      <section className="vag-wrap">
        <GameHead
          icon="/voiceactinggame/mandarin-challenge-icon.webp"
          iconAlt="Mandarin Challenge app icon"
          title="Mandarin Challenge"
          subtitle="Speak & learn Mandarin game"
          action={{ label: 'Download Now', href: APP_URL }}
          rating={{ score: '4.3/5', count: '23 reviews' }}
        />
      </section>

      <Section title="Game Screenshots">
        <ShotStrip shots={shots} hint="Swipe to see more screenshots" />
      </Section>

      <Section title="How It Works" variant="cream">
        <TileGrid columns={3} tiles={howItWorks} />
      </Section>
      <Section title="Key Features">
        <TileGrid columns={3} tiles={features} />
      </Section>

      <ReviewsSection
        title="What Learners Say"
        score="4.3"
        count="Based on 23 reviews"
        reviews={reviews}
      />

      <PlatformsRow title="Available Platforms" items={platforms} />

      <CtaBand
        title="Ready to Learn Mandarin?"
        body="Start speaking Mandarin with confidence through this innovative language learning game!"
        badges={false}
        action={{ label: 'Download Now', href: APP_URL }}
      />
    </main>
  );
}