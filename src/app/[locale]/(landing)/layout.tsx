import { ReactNode } from 'react';

import '@/config/style/voiceactinggame.css';

import { VagFooter, VagHeader } from '@/shared/blocks/voiceactinggame/site';

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="vag-shell">
      <VagHeader />
      {children}
      <VagFooter />
    </div>
  );
}
