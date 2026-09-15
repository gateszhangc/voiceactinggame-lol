export const SITE_URL = 'https://voiceactinggame.lol';

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Voice Acting Game',
    url: SITE_URL,
    description:
      'Voice Acting Game is a collection of voice-controlled games you play in the browser.',
    inLanguage: 'en',
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Voice Acting Game',
    url: SITE_URL,
    logo: `${SITE_URL}/voiceactinggame/logo.svg`,
  };
}

export function itemListSchema(
  name: string,
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function videoGameSchema({
  name,
  description,
  slug,
  category = 'Game',
  genre,
  rating,
  reviewCount,
}: {
  name: string;
  description: string;
  slug: string;
  category?: string;
  genre: string[];
  rating?: string;
  reviewCount?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name,
    description,
    url: `${SITE_URL}/game/${slug}`,
    applicationCategory: category,
    operatingSystem: 'Web browser, iOS, iPadOS, Android',
    genre,
    playMode: 'SinglePlayer',
    inLanguage: 'en',
    ...(rating && reviewCount
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: rating,
            reviewCount,
            bestRating: '5',
          },
        }
      : {}),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function webPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: { '@type': 'WebSite', url: SITE_URL, name: 'Voice Acting Game' },
    inLanguage: 'en',
  };
}

export function articleSchema({
  headline,
  description,
  path,
  datePublished,
  image,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    datePublished,
    dateModified: datePublished,
    mainEntityOfPage: `${SITE_URL}${path}`,
    image: `${SITE_URL}${image}`,
    author: { '@type': 'Organization', name: 'Voice Acting Game' },
    publisher: {
      '@type': 'Organization',
      name: 'Voice Acting Game',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/voiceactinggame/logo.svg` },
    },
    inLanguage: 'en',
  };
}