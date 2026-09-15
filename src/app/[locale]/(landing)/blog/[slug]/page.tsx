import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { BlogPost, getPost, posts } from '@/shared/blocks/voiceactinggame/blog';
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
} from '@/shared/blocks/voiceactinggame/json-ld';
import { getMetadata } from '@/shared/lib/seo';

export const revalidate = 3600;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return getMetadata({ title: 'Post not found' })({ params });
  }

  return getMetadata({
    title: post.title + ' | Voice Acting Game',
    description: post.excerpt,
    keywords: post.tag.toLowerCase() + ', voice game guide, ' + post.title.toLowerCase(),
    canonicalUrl: '/blog/' + post.slug,
    imageUrl: post.image,
  })({ params });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPost(slug);
  if (!post) {
    notFound();
  }

  return (
    <main>
      <JsonLd
        data={articleSchema({
          headline: post.title,
          description: post.excerpt,
          path: '/blog/' + post.slug,
          datePublished: post.isoDate,
          image: post.image,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: '/blog/' + post.slug },
        ])}
      />
      <div className="vag-wrap">
        <BlogPost post={post} />
      </div>
    </main>
  );
}