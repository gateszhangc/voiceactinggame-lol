import { MetadataRoute } from 'next';

import { envConfigs } from '@/config';
import { posts } from '@/shared/blocks/voiceactinggame/blog';

export const dynamic = 'force-static';

const pages: {
  path: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
}[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/voice-over-game', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/game/dino-game', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/game/vocal-range-test', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/game/voice-through', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/game/scream-chicken', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/game/mandarin-challenge', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/game/say-the-word-on-beat', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/privacy-choicer-dub-studio', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/terms-choicer-dub-studio', priority: 0.4, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = envConfigs.app_url;
  const now = new Date();

  return [
    ...pages.map((page) => ({
      url: baseUrl + page.path,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...posts.map((post) => ({
      url: baseUrl + '/blog/' + post.slug,
      lastModified: new Date(post.isoDate),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}