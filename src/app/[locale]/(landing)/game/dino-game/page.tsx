import { Gamepad2, Layers, Trophy } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

import { TRexRun3D } from '@/shared/blocks/voiceactinggame/trex-run-3d';
import { TileGrid } from '@/shared/blocks/voiceactinggame/sections';
import {
  JsonLd,
  breadcrumbSchema,
  videoGameSchema,
} from '@/shared/blocks/voiceactinggame/json-ld';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Voice-Controlled Dino Run | T-Rex Run 3D Voice Game',
  description:
    'Play the voice-controlled T-Rex Run 3D game in your browser. Shout or tap to make the dinosaur jump over cacti and pterodactyls, then beat your high score.',
  keywords: 'dino game, t-rex run 3d, voice controlled dino, play dino game online, voice game',
  canonicalUrl: '/game/dino-game',
});

const tips = [
  {
    icon: <Gamepad2 size={18} aria-hidden="true" />,
    title: 'Voice control',
    body: 'The run starts with the microphone on. Keep talking at a steady level to stay grounded, then raise your voice to jump.',
  },
  {
    icon: <Layers size={18} aria-hidden="true" />,
    title: '3D graphics',
    body: 'A WebGL scene renders the T-Rex, cacti, and flying pterodactyls with parallax terrain and dynamic lighting.',
  },
  {
    icon: <Trophy size={18} aria-hidden="true" />,
    title: 'Endless challenge',
    body: 'Obstacles speed up as your score climbs, and your best run is saved in this browser.',
  },
];

export default async function DinoGamePage({
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
          name: 'Voice-Controlled Dino Run',
          description:
            'A voice-controlled 3D T-Rex runner: shout or tap to jump over cacti and flying pterodactyls.',
          slug: 'dino-game',
          genre: ['Casual', 'Voice-controlled', 'Runner'],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Voice-Controlled Dino Run', path: '/game/dino-game' },
        ])}
      />

      <section className="vag-wrap" style={{ paddingTop: 30 }}>
        <div className="vag-game-head">
          <h1 className="vag-h1">T-Rex Run 3D</h1>
          <p className="vag-lead">
            Use your voice or tap to make the T-Rex jump. Avoid cacti and flying
            pterodactyls!
          </p>
        </div>
        <TRexRun3D />
        <div className="vag-game-legend">
          <span>
            <Gamepad2 size={16} aria-hidden="true" /> Voice Control
          </span>
          <span>
            <Layers size={16} aria-hidden="true" /> 3D Graphics
          </span>
          <span>
            <Trophy size={16} aria-hidden="true" /> Endless Challenge
          </span>
        </div>
      </section>

      <section className="vag-section">
        <div className="vag-wrap">
          <h2 className="vag-h2">How the voice-controlled dino run works</h2>
          <p className="vag-lead" style={{ textAlign: 'center' }}>
            T-Rex Run 3D turns your microphone into the jump button. Every run is
            a test of timing, breath control, and steady volume.
          </p>
          <TileGrid columns={3} tiles={tips} />
        </div>
      </section>
    </main>
  );
}
