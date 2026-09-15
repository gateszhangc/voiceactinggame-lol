import { setRequestLocale } from 'next-intl/server';

import { VocalRangeTest } from '@/shared/blocks/voiceactinggame/vocal-range-test';
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from '@/shared/blocks/voiceactinggame/json-ld';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Vocal Range Test | Find Your Vocal Range Online',
  description:
    'Measure your vocal range with real-time pitch detection in the browser. Sing or hum your lowest and highest comfortable notes, then compare your range with famous singers.',
  keywords:
    'vocal range test, find my vocal range, voice type test, pitch detection, sing range test',
  canonicalUrl: '/game/vocal-range-test',
});

export default async function VocalRangeTestPage({
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
          name: 'Vocal Range Test | Find Your Vocal Range Online',
          description:
            'Free online vocal range test with real-time pitch detection, voice type estimate, and singer comparisons.',
          path: '/game/vocal-range-test',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Vocal Range Test', path: '/game/vocal-range-test' },
        ])}
      />
      <section className="vag-wrap" style={{ paddingTop: 30 }}>
        <div className="vag-game-head">
          <p className="vag-chip">Range / Pitch</p>
          <h1 className="vag-h1">Vocal Range Test</h1>
          <p className="vag-lead">Test your vocal range with real-time pitch detection</p>
        </div>
        <VocalRangeTest />
      </section>
    </main>
  );
}