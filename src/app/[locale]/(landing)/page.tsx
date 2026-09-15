import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { getMetadata } from '@/shared/lib/seo';
import {
  JsonLd,
  itemListSchema,
  organizationSchema,
  websiteSchema,
} from '@/shared/blocks/voiceactinggame/json-ld';

export const revalidate = 3600;

export const generateMetadata = getMetadata({
  title: 'Voice Acting Game | Play Voice-Controlled Games Online',
  description:
    'Play free voice games in your browser: dub your own scene in the Voice Over Game, test your vocal range, scream-jump a chicken, run with a voice-controlled T-Rex, and learn Mandarin with your voice.',
  keywords:
    'voice acting game, voice controlled games, voice over game, play games with your voice, online voice games, vocal range test, dino game',
  canonicalUrl: '/',
});

const games = [
  {
    href: '/game/scream-chicken',
    title: 'Scream Chicken! Run',
    icon: '/voiceactinggame/scream-chicken-icon-square.webp',
    body: 'Adds more modes and official content than the TikTok voice filter',
    tone: 'rose',
  },
  {
    href: '/game/voice-through',
    title: 'Voice Through Game',
    icon: '/voiceactinggame/app-icon.webp',
    body: 'Learn about our innovative voice-controlled game and its features',
    tone: 'sky',
  },
  {
    href: '/game/vocal-range-test',
    title: 'Vocal Range Test',
    icon: '/voiceactinggame/vocal-range-test.png',
    body: 'Discover your lowest and highest comfortable notes with real-time pitch detection',
    tone: 'violet',
  },
  {
    href: '/game/dino-game',
    title: 'Voice-Controlled Dino Run',
    icon: '/voiceactinggame/no-internet.png',
    body: 'Jump into the game and test your vocal skills',
    tone: 'mint',
  },
  {
    href: '/game/mandarin-challenge',
    title: 'Mandarin Challenge',
    icon: '/voiceactinggame/mandarin-challenge-icon.webp',
    body: 'Learn Mandarin through interactive voice-controlled gameplay',
    tone: 'blush',
  },
  {
    href: '/game/say-the-word-on-beat',
    title: 'Say the Word on Beat',
    icon: '/voiceactinggame/say-on-beat-app-icon.jpg',
    body: 'Say each word exactly on the beat and test your timing',
    tone: 'peach',
  },
] as const;

export default async function VoiceGamesHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={itemListSchema(
          'Voice-controlled games',
          games.map((game) => ({
            name: game.title,
            url: `${envConfigs.app_url}${game.href}`,
          }))
        )}
      />

      <section className="vag-wrap">
        <div className="vag-home-head">
          <h1 className="vag-home-title">Voice-Controlled Games</h1>
          <p className="vag-home-sub">Play games using just your voice</p>
        </div>

        <div className="vag-hero-panel">
          <div className="vag-hero-copy-wrap">
            <p className="vag-kicker">Make your own dub</p>
            <h2 className="vag-display vag-hero-title">Voice Over Game</h2>
            <p className="vag-hero-copy">
              Turn any voice pack into your own scene. Hear the original line,
              record your take, then watch the finished dub in your browser.
            </p>
            <Link href="/voice-over-game" className="vag-explore">
              Explore
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="vag-hero-media">
            <Image
              src="/voiceactinggame/choicer-voicer-hero.webp"
              alt="Choicer Voicer voice over game studio showing a CRT dub monitor and voice waveform"
              width={1200}
              height={630}
              priority
              sizes="(max-width: 1080px) 100vw, 560px"
            />
            <p className="vag-chip" style={{ marginTop: 14 }}>
              CV-01 / Online
            </p>
          </div>
        </div>

        <div className="vag-card-grid">
          {games.map((game) => (
            <article key={game.href} className={`vag-card vag-card--${game.tone}`}>
              <Image
                className="vag-card-icon"
                src={game.icon}
                alt={`${game.title} icon`}
                width={62}
                height={62}
              />
              <h3 className="vag-card-title">{game.title}</h3>
              <p className="vag-card-desc">{game.body}</p>
              <Link href={game.href} className="vag-card-link">
                Explore
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="vag-closing">
        <h2>Ready to begin?</h2>
        <p>Choose your path and discover the world of voice-controlled gaming</p>
      </section>
    </main>
  );
}
