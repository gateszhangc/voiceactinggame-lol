import { setRequestLocale } from 'next-intl/server';

import { BlogIndex } from '@/shared/blocks/voiceactinggame/blog';
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from '@/shared/blocks/voiceactinggame/json-ld';
import { getMetadata } from '@/shared/lib/seo';

export const revalidate = 3600;

export const generateMetadata = getMetadata({
  title: 'Voice Game Blog | Guides, Reviews and How-Tos',
  description:
    'Guides and reviews for voice-controlled games: how to play Choicer Voicer on mobile, how the multiplayer dub studio works, and the best microphone-only games.',
  keywords:
    'voice game blog, voice over game guide, choicer voicer guide, voice game reviews',
  canonicalUrl: '/blog',
});

export default async function BlogPage({
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
          name: 'Voice Game Blog',
          description:
            'Guides, reviews, and how-tos for voice-controlled games you can play with just your voice.',
          path: '/blog',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />

      <section className="vag-wrap">
        <div className="vag-home-head">
          <h1 className="vag-home-title">Voice Game Blog</h1>
          <p className="vag-home-sub">
            Guides, reviews, and how-tos for voice-controlled games
          </p>
        </div>
      </section>

      <BlogIndex />
    </main>
  );
}