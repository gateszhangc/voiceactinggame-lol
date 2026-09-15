import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';

import { JsonLd, webPageSchema } from '@/shared/blocks/voiceactinggame/json-ld';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: "Privacy Policy | Choicer Dub Studio",
  description: "Privacy Policy for Choicer Dub Studio: local source media, optional collaborative dubbing, shared voice recordings, content safety, and data deletion.",
  keywords: "choicer dub studio privacy, voice recording privacy, collaborative dubbing data",
  canonicalUrl: "/privacy-choicer-dub-studio",
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
          name: "Privacy Policy | Choicer Dub Studio",
          description: "Privacy Policy for Choicer Dub Studio: local source media, optional collaborative dubbing, shared voice recordings, content safety, and data deletion.",
          path: "/privacy-choicer-dub-studio",
        })}
      />

      <article className="vag-legal vag-wrap">
        <h1>Privacy Policy for Choicer Dub Studio</h1>
        <p className="vag-legal-updated">Last updated: September 14, 2026</p>
        <p>How the iOS app handles local media, collaborative dubbing, shared recordings, and your privacy choices.</p>
        <p>CHOICER DUB STUDIO / LEGAL</p>
        <p>Privacy Policy for Choicer Dub Studio</p>
        <p>Last Updated: September 14, 2026</p>
        <h2>1. Introduction</h2>
        <p>This Privacy Policy explains how Choicer Dub Studio (the "App," "we," "us," or "our") handles information when you use our iOS video editing and audio recording application.</p>
        <p>The App supports on-device creation and optional collaborative dubbing with people you invite. The iOS app does not require account registration or Google sign-in and does not show advertising.</p>
        <h2>2. Information We Handle</h2>
        <h3>2.1 Videos, recordings, and projects you create</h3>
        <p>Depending on the features you use, the App may work with videos, audio recordings, voice takes, timelines, captions, thumbnails, project settings, and exported files that you select or create.</p>
        <p>Your original videos and source clips stay on your device and are never uploaded to our servers by the collaboration feature.</p>
        <p>Solo recordings, projects, and exports are processed and stored locally. Voice recordings you choose to share in a collaboration are handled as described in Section 2.5.</p>
        <p>When you export or share a file, the action is initiated by you through iOS. The destination service then applies its own privacy policy.</p>
        <h3>2.2 Microphone access</h3>
        <p>The App requests microphone access when you choose to record audio or use another microphone-dependent feature.</p>
        <p>Recording begins only after you start the recording control. The App does not record in the background.</p>
        <p>Audio used in a recording is processed and saved locally as part of your project or export.</p>
        <p>In a collaboration, recorded voice clips are uploaded when you confirm a clip or finish your assigned clips. We do not use your voice to create a biometric identity or voiceprint.</p>
        <h3>2.3 Photos, Files, and selected media</h3>
        <p>If you choose a video or audio file through an iOS Photos picker, Files picker, or share sheet, iOS grants the App access to the item you selected. The App does not read your entire photo library, Files library, contacts, or other unrelated content.</p>
        <h3>2.4 Subscription and purchase information</h3>
        <p>The App offers optional subscriptions. Apple processes payment and keeps your Apple ID billing details; we do not receive your credit-card number, billing address, or other payment credentials.</p>
        <p>To unlock and maintain premium features, the App and its subscription-management service (RevenueCat, where used for the App) may receive purchase history, product identifiers, transaction information, and subscription or entitlement status. An anonymous app user identifier may also be sent to our collaboration service in connection with your use of the feature. It is not your Apple ID or payment credentials. Subscription providers do not receive your locally stored media from the App.</p>
        <h3>2.5 Optional collaborative dubbing</h3>
        <p>Every participant must have the same source media stored locally on their own device, including any video and original source clips. Collaboration does not distribute those source files. Before you first use collaboration, the App explains the sharing involved and asks you to agree.</p>
        <p>Our servers receive your generated or custom nickname, collaboration code, member identifier, assigned roles, readiness, and recording progress.</p>
        <p>We receive voice-pack metadata, such as its title, identifier, role names, clip counts, and role assignments, to coordinate the collaboration.</p>
        <p>Your newly recorded voice clips are uploaded when you confirm a clip or finish your clips. Other members can download, play, and export the shared recordings together with their own local source media.</p>
        <p>Other members can see your nickname, roles, progress, and the collaboration&#39;s pack details. Invite codes and links allow access to the collaboration, so share them only with people you trust.</p>
        <h3>2.6 Content safety, reports, and support</h3>
        <p>When you save a custom nickname, it is sent to our servers for an automated content safety check, with processing by a content safety service provider. Our team may review custom nicknames and shared recordings for safety, including when investigating reports. We review reports within 24 hours and promptly remove shared content that violates our rules from our servers.</p>
        <p>If you submit feedback, a report, or a deletion request, we receive the details you submit, relevant collaboration and recording identifiers, and any contact email you provide. Our services also process technical request information, such as IP address, app or browser information, and country or region, to deliver requests and help prevent abuse.</p>
        <p>Blocked-member records and records of successfully submitted member reports are saved on your device to apply your collaboration safety choices. Blocks apply to the relevant collaboration on that device.</p>
        <h2>3. Information We Do Not Collect</h2>
        <p>The collaboration feature does not require access to:</p>
        <p>Your legal name, phone number, contacts, or Apple ID credentials</p>
        <p>Your original video files, source clips, or unrelated local projects</p>
        <p>Precise location, health data, or other sensitive personal information</p>
        <p>A nickname or something you say in a shared recording may identify you. Avoid including personal details you do not want other members to receive.</p>
        <h2>4. How Information Is Used</h2>
        <p>Information is used only for the following limited purposes:</p>
        <p>To edit, preview, record, save, and export content at your direction on your device</p>
        <p>To coordinate collaborations and deliver shared voice recordings to their members</p>
        <p>To verify subscription entitlement and provide paid features</p>
        <p>To check custom nicknames, investigate reports, enforce content rules, and prevent abuse</p>
        <p>To respond to support messages and privacy or deletion requests</p>
        <p>To comply with legal obligations or protect the security of the App when required</p>
        <p>Where data protection law requires a legal basis, we rely on your consent for optional sharing, performance of our agreement to provide requested features, our legitimate interests in service security and abuse prevention, and applicable legal obligations. You can withdraw sharing consent through the App without affecting processing that took place before withdrawal.</p>
        <h2>5. Third-Party Services and Sharing</h2>
        <p>We do not sell personal information or use your collaboration content for advertising. Information is shared as needed to provide the features you choose:</p>
        <p>Apple App Store / StoreKit: processes payments, receipts, and subscription renewals.</p>
        <p>RevenueCat (if enabled for your App version): helps manage subscription status and entitlements. It does not receive your locally stored media.</p>
        <p>Collaboration members: receive the shared recordings and participation details described in Section 2.5.</p>
        <p>Hosting and content safety providers: process collaboration data or custom nicknames on our behalf to operate and protect the service.</p>
        <p>Support and email providers: help us receive reports and requests and send responses.</p>
        <p>Apple and subscription providers process their service data under their respective privacy policies. Service providers may process information outside your country. Where required by data protection law, appropriate safeguards must apply to those transfers. We may disclose information if required by law or necessary to prevent fraud, abuse, or a security threat.</p>
        <h2>6. Storage, Retention, and Security</h2>
        <p>Original source media and solo projects remain in local storage. Collaboration also stores and transfers the shared voice clips described above.</p>
        <p>Shared voice recordings are automatically deleted from our collaboration servers within 24 hours of upload. This retention period applies to the shared audio, not every category of service data.</p>
        <p>We retain participation metadata, safety reports, support messages, and request records only as needed to operate the service, handle the relevant issue, protect against abuse, or meet legal obligations.</p>
        <p>Files you save outside the App, including in Photos, Files, or a cloud drive, are governed by the settings and policies of that destination.</p>
        <p>iOS may include local App data in device backups according to your Apple backup settings. Device backups are separate from collaboration uploads.</p>
        <p>Because local storage can be lost through device damage, deletion, or a failed backup, you are responsible for keeping copies of anything important.</p>
        <p>We use encrypted connections and access controls for the collaboration service. No storage or transmission method can guarantee complete security.</p>
        <h2>7. Your Choices and Rights</h2>
        <p>Grant, deny, or revoke microphone access in iOS Settings. Recording features require permission.</p>
        <p>Decline collaboration sharing and continue using local features. Use Stop sharing in Collaboration privacy to leave the current collaboration and stop new uploads; this does not itself delete data already shared.</p>
        <p>Report a member or an individual voice clip from the collaboration screen. In Library, you can also report an entire saved collaboration recording, a contributing member, or an individual voice clip.</p>
        <p>Block members, or manage existing blocks in Collaboration privacy.</p>
        <p>Delete individual recordings, projects, and exports from the App or from the iOS location where you saved them.</p>
        <p>Use Settings &gt; Delete data to delete local media, recordings, and drafts, or to request deletion of your server-side collaboration recordings and participation data. These are separate operations.</p>
        <p>Collaboration deletion requests are handled manually within 7 days, with confirmation sent to the email you provide. You can also email us with the collaboration code and nickname so we can locate the relevant data.</p>
        <p>Delete the App to remove its local App data. Items exported to Photos, Files, or another service may need to be deleted there separately.</p>
        <p>Manage or cancel a subscription in your Apple ID subscription settings. Cancellation takes effect at the end of the current billing period.</p>
        <p>Contact us about a privacy question at hi@playvoicegames.com.</p>
        <p>Depending on where you live, including in the European Economic Area, you may have rights to access, correct, delete, or receive a copy of your personal data, restrict or object to processing, and withdraw consent. Contact us to exercise these rights; we may ask for information needed to verify the request. You may also complain to your local data protection authority. We respond within the time limits required by applicable law.</p>
        <h2>8. Subscription Information</h2>
        <p>Subscriptions are optional and are offered through Apple&#39;s in-app purchase system. The price, billing period, and any trial offer are shown before you confirm a purchase. See the Terms of Service for the subscription rules that apply to your use of the App.</p>
        <h2>9. Children&#39;s Privacy</h2>
        <p>The App is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided personal information through collaboration or support, contact us so we can investigate and arrange deletion where appropriate. Parents or guardians can manage microphone permission and purchases through iOS settings.</p>
        <h2>10. Changes to This Policy</h2>
        <p>We may update this Privacy Policy when the App or applicable law changes. We will post the revised policy on this page and update the "Last Updated" date. Where required, we will notify you of material changes and seek consent before introducing new processing that requires it.</p>
        <h2>11. Contact Us</h2>
        <p>If you have a question, request, or concern about this Privacy Policy, please contact us at hi@playvoicegames.com. The App&#39;s collaboration support address, hello@mail.thechoicervoicer.app, also accepts collaboration privacy and deletion requests.</p>
        <p style={{ marginTop: 32 }}>
          <Link href="/terms-choicer-dub-studio">Terms of Service</Link>
        </p>
      </article>
    </main>
  );
}
