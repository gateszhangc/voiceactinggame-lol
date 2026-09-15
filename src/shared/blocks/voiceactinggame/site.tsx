'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Mail } from 'lucide-react';

import { envConfigs } from '@/config';

const navItems = [
  { href: '/game/dino-game', label: 'Play Game' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export function VagMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Voice Acting Game logo"
      className="vag-brand-mark"
      style={{ width: size, height: size }}
    >
      <defs>
        <linearGradient id="vagMarkGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="55%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#vagMarkGradient)" />
      <g fill="#ffffff">
        <rect x="26" y="14" width="12" height="22" rx="6" />
        <path d="M20 33a12 12 0 0 0 24 0h-4.4a7.6 7.6 0 0 1-15.2 0H20z" />
        <rect x="30" y="46" width="4" height="7" rx="2" />
      </g>
    </svg>
  );
}

export function VagHeader() {
  const pathname = usePathname() || '/';

  return (
    <header className="vag-header">
      <div className="vag-wrap vag-header-inner">
        <Link href="/" className="vag-brand" aria-label={envConfigs.app_name}>
          <VagMark />
          <span>{envConfigs.app_name}</span>
        </Link>
        <nav className="vag-nav" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={pathname.startsWith(item.href) ? 'true' : 'false'}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function VagFooter() {
  return (
    <footer className="vag-footer">
      <div className="vag-footer-links">
        <Link href="/">Home</Link>
        <Link href="/game/dino-game">Play Game</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/privacy-choicer-dub-studio">Studio Privacy</Link>
        <Link href="/terms-choicer-dub-studio">Terms</Link>
      </div>
      <p style={{ margin: 0 }}>
        {'\u00a9'} {new Date().getFullYear()} {envConfigs.app_name}. All rights reserved.
      </p>
    </footer>
  );
}

export function ExploreLink({
  href,
  label = 'Explore',
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link href={href} className="vag-explore">
      <span>{label}</span>
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}

export function MailLink({ email }: { email: string }) {
  return (
    <span className="vag-explore" style={{ color: '#0f172a' }}>
      <Mail size={16} aria-hidden="true" />
      <span>{email}</span>
    </span>
  );
}