import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';

import { JsonLd, webPageSchema } from '@/shared/blocks/voiceactinggame/json-ld';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: "Privacy Policy | Voice Acting Game",
  description: "Read the Voice Acting Game privacy policy: what microphone, camera, and device data the games use, how it is handled, and the choices you have.",
  keywords: "voice acting game privacy policy, microphone data, game privacy",
  canonicalUrl: "/privacy",
});

export default async function LegalPage({
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
          name: "Privacy Policy | Voice Acting Game",
          description: "Read the Voice Acting Game privacy policy: what microphone, camera, and device data the games use, how it is handled, and the choices you have.",
          path: "/privacy",
        })}
      />

      <article className="vag-legal vag-wrap">
        <h1>Privacy Policy for Voice Acting Game</h1>
        <p className="vag-legal-updated">Last updated: October 31, 2024</p>

        <h2>Introduction</h2>
        <p>This Privacy Policy describes how Voice Through ("we," "our," or "us") collects, uses, and shares information when you use our mobile game application ("the Game"). We are committed to protecting your privacy and being transparent about our data practices.</p>
        <h2>Information We Collect</h2>
        <h2>Device Information</h2>
        <p>Device Identifier (IDFA/Advertising ID): We collect your device&#39;s advertising identifier to enable personalized advertising experiences.</p>
        <h2>Microphone Access</h2>
        <p>We request access to your device&#39;s microphone solely for gameplay purposes, as the game mechanics require voice input to interact with the game. Audio input is processed in real-time and is not recorded, stored, or transmitted to any servers.</p>
        <h2>Camera Access</h2>
        <p>We request access to your device&#39;s camera only when you choose to record your gameplay. Camera access is entirely optional and not required for core gameplay. Video recordings are stored locally on your device and are not automatically uploaded to any servers. You have full control over when to start and stop recording, and can delete recordings at any time.</p>
        <h2>How We Use Your Information</h2>
        <p>Device Identifier</p>
        <p>To serve personalized advertisements through third-party advertising partners To measure advertising effectiveness To prevent advertising fraud</p>
        <p>Microphone Data</p>
        <p>Used exclusively for real-time gameplay mechanics Processed locally on your device Not recorded or stored in any form Not used for any other purposes</p>
        <p>Camera Data</p>
        <p>Used solely for gameplay recording when explicitly initiated by you Video recordings are stored locally on your device You maintain full control over your recordings We do not access or transmit your recordings without your explicit consent</p>
        <h2>Data Sharing and Disclosure</h2>
        <h2>We share device identifiers with:</h2>
        <p>Third-party advertising partners to deliver relevant advertisements Analytics providers to measure game performance and advertising effectiveness</p>
        <h2>We DO NOT:</h2>
        <p>Sell your personal information Share your microphone or camera data with any third parties Upload or store your video recordings on our servers Collect or share any other personal information</p>
        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at: hi@playvoicegames.com</p>
        <h2>Consent</h2>
        <p>By using the Game, you consent to our Privacy Policy and agree to its terms.</p>
        <h2>Data Storage and Security</h2>
        <p>Device identifiers are stored securely using industry-standard encryption</p>
        <p>Microphone data is processed in real-time and is not stored</p>
        <p>Video recordings are stored locally on your device only</p>
        <p>We implement appropriate technical measures to protect your information</p>
        <h2>Children&#39;s Privacy</h2>
        <p>Our Game may be used by children under 13 years of age. With respect to children&#39;s privacy:</p>
        <p>We do not knowingly collect or store any personal information from children under 13</p>
        <p>The microphone access is used solely for gameplay mechanics and no voice data is recorded or stored</p>
        <p>The camera access is optional and recordings are stored only on the device</p>
        <p>Advertising ID collection is used only for serving appropriate, age-friendly advertisements</p>
        <p>Parents can control microphone, camera access and advertising settings through their device settings</p>
        <h2>Your Choices and Rights</h2>
        <p>You can:</p>
        <p>Reset your device&#39;s advertising identifier at any time through your device settings</p>
        <p>Opt-out of personalized advertising through your device settings</p>
        <p>Deny or revoke microphone and camera permissions through your device settings</p>
        <p>Delete your video recordings directly from your device</p>
        <p>Delete the game to remove all locally stored data</p>
        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
        <p style={{ marginTop: 32 }}>
          <Link href="/privacy-choicer-dub-studio">Choicer Dub Studio Privacy Policy</Link>
        </p>
      </article>
    </main>
  );
}
