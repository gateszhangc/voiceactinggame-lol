import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';

import { JsonLd, webPageSchema } from '@/shared/blocks/voiceactinggame/json-ld';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: "Terms of Service | Choicer Dub Studio",
  description: "Terms of Service for Choicer Dub Studio: local editing, collaborative dubbing, shared content, subscriptions, refunds, and acceptable use.",
  keywords: "choicer dub studio terms, voice app terms of service, subscription terms",
  canonicalUrl: "/terms-choicer-dub-studio",
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
          name: "Terms of Service | Choicer Dub Studio",
          description: "Terms of Service for Choicer Dub Studio: local editing, collaborative dubbing, shared content, subscriptions, refunds, and acceptable use.",
          path: "/terms-choicer-dub-studio",
        })}
      />

      <article className="vag-legal vag-wrap">
        <h1>Terms of Service for Choicer Dub Studio</h1>
        <p className="vag-legal-updated">Last updated: September 12, 2026</p>
        <p>The rules for using the App, creating with your own media, and managing an optional subscription.</p>
        <p>CHOICER DUB STUDIO / LEGAL</p>
        <p>Last Updated: September 12, 2026</p>
        <p>These Terms of Service ("Terms") are an agreement between you and the provider of Choicer Dub Studio (the "App"). They govern your use of the App on an iPhone or iPad.</p>
        <p>By downloading, accessing, or using the App, you agree to these Terms. If you do not agree, do not use the App.</p>
        <h2>1. Acceptance and Apple&#39;s Terms</h2>
        <p>You must use the App in compliance with these Terms, applicable law, and the rights of other people. Your use of the App and any in-app purchase is also subject to Apple&#39;s Media Services Terms and Conditions and other applicable Apple policies.</p>
        <h2>2. Description of the App</h2>
        <p>Choicer Dub Studio provides tools for importing media you choose, editing video and audio, recording voice tracks through the microphone, and exporting finished work. Projects and recordings are designed to be processed and stored locally on your device.</p>
        <p>Optional collaborative dubbing lets you invite others, assign roles, and share newly recorded voice clips. Each participant must have the same source media stored locally on their own device. The iOS app does not require account registration and does not provide public feeds or advertising.</p>
        <h2>3. Permissions and Local Recording</h2>
        <p>You are responsible for granting microphone permission when you want to record audio.</p>
        <p>The App records only when you intentionally start a recording. You control when to stop, keep, edit, export, or delete it.</p>
        <p>Original videos and source clips stay on your device. In a collaboration, your recorded voice clips are uploaded when you confirm a clip or finish your clips, so other members can play and export them together.</p>
        <p>If you select media through Photos or Files, iOS controls access to the items you select.</p>
        <h2>4. Your Content and Responsibilities</h2>
        <p>You keep ownership of the videos, audio, voice recordings, artwork, captions, and other material you import or create ("User Content"). We do not claim ownership of your User Content.</p>
        <p>You are responsible for ensuring that:</p>
        <p>You own User Content or have all permissions and licenses needed to edit, record, export, and share it.</p>
        <p>You obtain any consent required before recording another person&#39;s voice or using their likeness.</p>
        <p>Your User Content and your use of the App do not violate copyright, privacy, publicity, or other laws.</p>
        <p>You keep backups of important projects because local files can be lost if a device or backup fails.</p>
        <p>You grant us the limited permission needed to process content on your device and, when you choose collaboration, temporarily host and deliver your shared voice recordings to its members and review shared content for safety. Other members may play and export those recordings as part of the collaboration. Our Privacy Policy explains data handling and deletion.</p>
        <h2>5. Subscriptions and In-App Purchases</h2>
        <p>The App offers optional auto-renewing subscriptions that unlock premium editing or recording features. The available plans, billing period, price, and any free trial are shown in the App and at the time of purchase.</p>
        <p>Payment is charged to your Apple ID account when you confirm the purchase.</p>
        <p>Unless you turn off auto-renewal at least 24 hours before the current period ends, the subscription renews automatically.</p>
        <p>Your Apple ID account is charged for renewal within 24 hours before the current period ends, at the then-current plan price.</p>
        <p>You can manage, change, or cancel subscriptions in your Apple ID subscription settings. Cancellation does not normally refund the current period.</p>
        <p>Any unused portion of a free trial, if offered, may be forfeited when you purchase a subscription.</p>
        <p>Prices may vary by country or region and may change with notice through the App Store.</p>
        <p>Use the App&#39;s restore-purchases control, when available, or Apple&#39;s purchase support to restore an eligible purchase.</p>
        <p>Apple processes billing and refunds. RevenueCat may be used to synchronize purchase entitlements for the App; it does not change your ownership of User Content or give the App access to your local media.</p>
        <h2>6. Refunds</h2>
        <p>Purchases are processed by Apple. Refund requests must be submitted to Apple through the App Store or Apple Support. We cannot issue an Apple App Store refund ourselves.</p>
        <h2>7. Acceptable Use</h2>
        <p>You agree not to:</p>
        <p>Use the App or exported content to break the law, infringe rights, or harm another person.</p>
        <p>Record, edit, or share someone&#39;s voice or likeness without the permission required by law.</p>
        <p>Use custom nicknames or shared recordings for harassment, hate speech, threats, or sexually explicit content.</p>
        <p>Interfere with the App, attempt unauthorized access, or introduce malicious code.</p>
        <p>Reverse engineer, decompile, or extract source code except where applicable law expressly permits it.</p>
        <p>Bypass subscription checks, abuse trials, or use premium features without a valid entitlement.</p>
        <p>Resell, sublicense, or redistribute the App or its protected content without written permission.</p>
        <h2>8. Intellectual Property</h2>
        <p>The App, including its software, interface, names, branding, designs, and included content (excluding User Content), belongs to us or our licensors and is protected by intellectual-property laws. These Terms give you a limited, personal, non-transferable license to use the App on Apple devices that you own or control. No other rights are transferred to you.</p>
        <h2>9. Availability and Disclaimer</h2>
        <p>The App is provided "as is" and "as available," to the fullest extent permitted by law. We do not guarantee that the App will be uninterrupted, error-free, compatible with every device, or able to preserve every local project or export. Editing and recording results can depend on the source file, available storage, device performance, and microphone conditions.</p>
        <h2>10. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, we will not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of data, revenue, or expected results arising from your use of the App. Nothing in these Terms limits liability that cannot be limited under applicable law.</p>
        <h2>11. Suspension and Termination</h2>
        <p>We may suspend or end access to the App if you materially violate these Terms or if doing so is required for legal, security, or operational reasons. You may stop using the App at any time by deleting it. Ending use does not automatically cancel an Apple subscription; manage that subscription through your Apple ID settings.</p>
        <h2>12. Changes to These Terms</h2>
        <p>We may update these Terms from time to time. We will post changes on this page and update the "Last Updated" date. Continued use of the App after changes means you accept the revised Terms to the extent permitted by law.</p>
        <h2>13. Governing Law</h2>
        <p>These Terms are governed by the laws of your country or region of residence, to the extent permitted by law. Any mandatory consumer protections in your place of residence continue to apply.</p>
        <h2>14. Contact Us</h2>
        <p>Questions about these Terms can be sent to hi@playvoicegames.com. For information about how data is handled, see the Privacy Policy.</p>
        <p style={{ marginTop: 32 }}>
          <Link href="/privacy-choicer-dub-studio">Privacy Policy</Link>
        </p>
      </article>
    </main>
  );
}
