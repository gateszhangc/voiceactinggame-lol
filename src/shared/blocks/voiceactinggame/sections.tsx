import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { ArrowRight, Star } from 'lucide-react';

export function Section({
  title,
  variant,
  children,
  id,
  lead,
}: {
  title?: string;
  lead?: string;
  variant?: 'tint' | 'cream' | 'pink';
  children: ReactNode;
  id?: string;
}) {
  const variantClass = variant ? ` vag-section--${variant}` : '';
  return (
    <section className={`vag-section${variantClass}`} id={id}>
      <div className="vag-wrap">
        {title ? <h2 className="vag-h2">{title}</h2> : null}
        {lead ? <p className="vag-lead" style={{ textAlign: 'center' }}>{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}

export type Shot = { src: string; alt: string; width: number; height: number };

export function ShotStrip({ shots, hint }: { shots: Shot[]; hint?: string }) {
  return (
    <div>
      <div className="vag-shot-strip">
        {shots.map((shot) => (
          <Image
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes="196px"
          />
        ))}
      </div>
      {hint ? <p className="vag-strip-hint">{hint}</p> : null}
    </div>
  );
}

export type Tile = { icon: ReactNode; title: string; body: string };

export function TileGrid({
  tiles,
  columns = 3,
}: {
  tiles: Tile[];
  columns?: 2 | 3;
}) {
  return (
    <div className={columns === 2 ? 'vag-grid-2' : 'vag-grid-3'}>
      {tiles.map((tile) => (
        <div className="vag-tile" key={tile.title}>
          <span className="vag-tile-icon" aria-hidden="true">{tile.icon}</span>
          <h3 className="vag-h3">{tile.title}</h3>
          <p>{tile.body}</p>
        </div>
      ))}
    </div>
  );
}

export type Review = { name: string; text: string; initial: string };

export function ReviewsSection({
  title,
  score,
  count,
  reviews,
}: {
  title: string;
  score: string;
  count: string;
  reviews: Review[];
}) {
  return (
    <Section title={title}>
      <div className="vag-reviews-head">
        <p className="vag-reviews-score">{score}</p>
        <div className="vag-review-stars" aria-hidden="true">
          <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" />{' '}
          <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" />{' '}
          <Star size={16} fill="currentColor" />
        </div>
        <p style={{ margin: '10px 0 0', color: '#64748b' }}>{count}</p>
      </div>
      <div className="vag-grid-3">
        {reviews.map((review) => (
          <article className="vag-review-card" key={review.name}>
            <div className="vag-review-top">
              <span className="vag-avatar" aria-hidden="true">{review.initial}</span>
              <div>
                <div className="vag-review-name">{review.name}</div>
                <div className="vag-review-stars" aria-hidden="true">★★★★★</div>
              </div>
            </div>
            <p className="vag-review-text">{review.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function StepPanels({
  title,
  steps,
}: {
  title: string;
  steps: { icon: ReactNode; title: string; body: string; tone: 'rose' | 'amber' }[];
}) {
  return (
    <Section title={title} variant="tint">
      <div className="vag-grid-2">
        {steps.map((step) => (
          <div className={`vag-step-panel vag-step-panel--${step.tone}`} key={step.title}>
            <span aria-hidden="true" style={{ display: 'inline-flex', color: '#ea580c' }}>
              {step.icon}
            </span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function NumberedSteps({
  title,
  steps,
}: {
  title: string;
  steps: { index: string; title: string; body: string }[];
}) {
  return (
    <Section title={title}>
      <div className="vag-feature-columns">
        {steps.map((step) => (
          <div className="vag-feature-item" key={step.title}>
            <span className="vag-feature-num">{step.index}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function PlatformsRow({
  title,
  items,
}: {
  title: string;
  items: { icon: ReactNode; label: string }[];
}) {
  return (
    <Section title={title}>
      <div className="vag-platform-row">
        {items.map((item) => (
          <div className="vag-platform" key={item.label}>
            <span aria-hidden="true" style={{ display: 'inline-flex', color: '#475569' }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function AppBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div className="vag-badges">
      <Image
        src="/voiceactinggame/app-store-badge.svg"
        alt="Download on the App Store"
        width={compact ? 120 : 132}
        height={compact ? 40 : 44}
        className="vag-badge-img"
      />
      <Image
        src="/voiceactinggame/google-play-badge.png"
        alt="Get it on Google Play"
        width={compact ? 132 : 148}
        height={compact ? 40 : 44}
        className="vag-badge-img"
      />
    </div>
  );
}

export function CtaBand({
  title,
  body,
  badges = true,
  action,
}: {
  title: string;
  body: string;
  badges?: boolean;
  action?: { label: string; href: string };
}) {
  return (
    <section className="vag-cta-band vag-cta-band--orange">
      <div className="vag-wrap">
        <h2>{title}</h2>
        <p>{body}</p>
        {badges ? <AppBadges /> : null}
        {action ? (
          <Link
            href={action.href}
            className="vag-btn vag-btn--blue"
            style={{ background: '#ffffff', color: '#7c2d12' }}
          >
            {action.label}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export function RatingLine({ score, count }: { score: string; count: string }) {
  return (
    <p className="vag-rating">
      Rating: <span className="vag-rating-stars" aria-hidden="true">★★★★★</span>{' '}
      <strong>{score}</strong> <span>({count})</span>
    </p>
  );
}

export function GameHead({
  icon,
  iconAlt,
  title,
  subtitle,
  badges = false,
  rating,
  action,
}: {
  icon: string;
  iconAlt: string;
  title: string;
  subtitle: string;
  badges?: boolean;
  rating?: { score: string; count: string };
  action?: { label: string; href: string };
}) {
  return (
    <div className="vag-game-head">
      <Image
        src={icon}
        alt={iconAlt}
        width={104}
        height={104}
        className="vag-game-icon"
        priority
      />
      <h1 className="vag-h1">{title}</h1>
      <p className="vag-lead">{subtitle}</p>
      {badges ? <AppBadges /> : null}
      {action ? (
        <p style={{ marginTop: 18 }}>
          <Link href={action.href} className="vag-btn vag-btn--blue">
            {action.label}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </p>
      ) : null}
      {rating ? <RatingLine score={rating.score} count={rating.count} /> : null}
    </div>
  );
}