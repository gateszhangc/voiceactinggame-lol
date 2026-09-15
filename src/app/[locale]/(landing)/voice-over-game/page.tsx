import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

import { getMetadata } from '@/shared/lib/seo';
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from '@/shared/blocks/voiceactinggame/json-ld';

const STUDIO_URL = 'https://thechoicervoicer.app/';

export const revalidate = 3600;

export const generateMetadata = getMetadata({
  title: 'Voice Over Game | Play Choicer Voicer Online',
  description:
    'Discover Choicer Voicer, a free browser-based voice over game. Choose a voice pack, perform each character, and create your own finished dub with no account required.',
  keywords:
    'voice over game, choicer voicer, voice acting game, browser dub studio, online voice game',
  canonicalUrl: '/voice-over-game',
});
const points = [
  'Record every line in your own voice',
  'Watch your dub play back end to end',
  'Free, no account, takes stay on-device',
];

const steps = [
  {
    index: '01',
    title: 'What is Voice Over Game?',
    body: 'Voice Over Game is an online voice-acting experience. You take the role of characters in a voice pack and turn a scene into your own performance.',
  },
  {
    index: '02',
    title: 'How it works',
    body: 'Choose a voice pack, perform the character parts, and let Choicer Voicer assemble your takes into a complete scene you can watch from beginning to end.',
  },
  {
    index: '03',
    title: 'Free and browser-based',
    body: 'The Voice Over Game runs directly in a modern browser. There is no app to install, and you can start playing for free from a computer or mobile device.',
  },
  {
    index: '04',
    title: 'No account required',
    body: 'Choicer Voicer does not ask you to create an account. Your recorded takes stay in your browser on your device unless you choose to export your finished work.',
  },
];
export default async function VoiceOverGamePage({
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
          name: 'Voice Over Game | Play Choicer Voicer Online',
          description:
            'Free browser-based voice over game: choose a voice pack, perform every character, and watch your finished dub.',
          path: '/voice-over-game',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Voice Over Game', path: '/voice-over-game' },
        ])}
      />
      <section className="vag-wrap" style={{ paddingTop: 40 }}>
        <div className="vag-hero-panel">
          <div>
            <p className="vag-kicker">Featured / Voice-Over Game</p>
            <h1 className="vag-display vag-hero-title">Voice Over Game</h1>
            <p className="vag-hero-copy">
              Turn any voice pack into your own scene. Hear the original line,
              record your take, then watch the finished dub in your browser.
            </p>
            <ul className="vag-hero-points">
              {points.map((point) => (
                <li key={point}>
                  <Check size={16} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <a href={STUDIO_URL} className="vag-btn vag-btn--blue" target="_blank" rel="noopener">
                Start dubbing for free
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a href={STUDIO_URL} className="vag-explore" target="_blank" rel="noopener">
                Open the Choicer Voicer studio
              </a>
            </div>
          </div>
          <div className="vag-hero-media">
            <Image
              src="/voiceactinggame/choicer-voicer-hero.webp"
              alt="Choicer Voicer CRT dub monitor with a voice waveform"
              width={1200}
              height={630}
              priority
              sizes="(max-width: 1080px) 100vw, 560px"
            />
          </div>
        </div>
      </section>
      <section className="vag-section">
        <div className="vag-wrap">
          <p className="vag-eyebrow">A browser-based dub studio</p>
          <h2 className="vag-h2">Meet the Voice Over Game</h2>
          <p className="vag-lead" style={{ textAlign: 'center' }}>
            Choicer Voicer turns voice acting into a simple creative game you can
            play online.
          </p>
          <div className="vag-feature-columns">
            {steps.map((step) => (
              <div className="vag-feature-item" key={step.index}>
                <span className="vag-feature-num">{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="vag-wrap" style={{ textAlign: 'center', paddingBottom: 60 }}>
        <Link href="/" className="vag-back-link">
          Back to Voice Games home
        </Link>
      </div>
    </main>
  );
}