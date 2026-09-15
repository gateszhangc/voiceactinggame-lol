import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'note'; text: string }
  | { type: 'image'; src: string; alt: string; width: number; height: number }
  | { type: 'cta'; label: string; href: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  tag: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  blocks: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: 'how-to-play-choicer-voicer-on-mobile',
    title: 'How to Play Choicer Voicer on Mobile',
    excerpt:
      'Download and import a Voice Pack ZIP, allow microphone access, record each line, then preview and export your dub from a phone.',
    date: 'August 21, 2026',
    isoDate: '2026-08-21',
    tag: 'Guides',
    image: '/voiceactinggame/choicer-voicer-mobile-studio.webp',
    imageAlt: 'Choicer Voicer dub studio running on a phone',
    imageWidth: 1200,
    imageHeight: 630,
    blocks: [
      {
        type: 'p',
        text: 'For the best mobile experience, open the voice over game studio in the latest version of Chrome on Android or Safari on iPhone and iPad. No installation is required. You will see a notice suggesting the desktop version; tap Got it to continue. It is a recommendation, not a restriction.',
      },
      { type: 'p', text: 'Here is the five-step guide to using the studio on your phone.' },
      { type: 'h2', text: '1. Download a Voice Pack ZIP' },
      {
        type: 'p',
        text: 'The studio does not host packs directly. Open Voice packs, pick a scene, and tap Download the pack to open its download page. Download the file and keep it zipped. iOS saves it to Files, while Android usually saves it to Downloads.',
      },
      {
        type: 'note',
        text: 'Tip: choose smaller packs on mobile. Unpacking a large ZIP uses more memory and storage, which can make a lower-end phone lag or crash. Use a normal browser tab if you want your packs and recordings to remain available, since a private session may clear the studio browser storage when it ends.',
      },
      { type: 'h2', text: '2. Import the pack' },
      {
        type: 'p',
        text: 'Tap Import a pack ZIP on the empty screen, or use the UPLOAD ZIP tile in the tape rack if you have imported a pack before. Tap Choose Pack ZIP, select the file, and the studio unpacks it into browser storage for future use.',
      },
      {
        type: 'image',
        src: '/voiceactinggame/choicer-voicer-mobile-import.webp',
        alt: 'The import panel on a phone with the Choose Pack ZIP button',
        width: 900,
        height: 1200,
      },
      { type: 'h2', text: '3. Allow microphone access' },
      {
        type: 'p',
        text: 'Tap Choose mic, then select Allow when prompted. If you blocked access before, enable microphone permission in your browser site settings and refresh the page.',
      },
      { type: 'h2', text: '4. Record line by line' },
      {
        type: 'ul',
        items: [
          'Tap Hear clip to listen to the original line.',
          'Tap Start recording and deliver your line.',
          'Compare your waveform with the original. Matching the timing and rhythm makes the dub sound more natural.',
          'Tap Next clip and repeat for the remaining lines.',
        ],
      },
      {
        type: 'image',
        src: '/voiceactinggame/choicer-voicer-mobile-controls.webp',
        alt: 'The two-column button grid on a phone: Hear clip, Start recording, Next clip, Play recording',
        width: 900,
        height: 1200,
      },
      { type: 'h2', text: '5. Preview and export' },
      {
        type: 'p',
        text: 'Once every line has a take, Watch dub unlocks, and Export video generates the final file.',
      },
      {
        type: 'note',
        text: 'Export time: H.264 packs may use fast export. Other packs use a real-time fallback, which takes about as long as the scene and may take longer on a slower phone. Keep the screen awake and the tab open until the export finishes. During the real-time fallback, mobile output is limited to 640 pixels on the long edge, while desktop fallback supports up to 1920x1080.',
      },
      { type: 'h2', text: 'Managing recordings and packs' },
      { type: 'h3', text: 'Recordings (bottom-left)' },
      {
        type: 'p',
        text: 'Once you save your first clip, the session appears here with the pack name, last-saved time, and progress. You can resume an unfinished dub, start a separate session from clip 1, or delete the session.',
      },
      { type: 'h3', text: 'Packs (bottom-right)' },
      {
        type: 'p',
        text: 'View all imported voice packs with their clip count, role count, and storage size. Tap a pack to inspect its clips or listen to the original lines, load it into the studio, or delete it. Deleting a pack also removes its saved recordings from this browser.',
      },
      { type: 'cta', label: 'Read the voice over game overview', href: '/voice-over-game' },
    ],
  },
  {
    slug: 'how-to-play-choicer-voicer-multiplayer',
    title: 'How to Play Choicer Voicer Multiplayer',
    excerpt:
      'Send the pack ZIP, create a room, claim a character, record your lines. A step-by-step guide to dubbing a scene together.',
    date: 'August 14, 2026',
    isoDate: '2026-08-14',
    tag: 'Guides',
    image: '/voiceactinggame/choicer-voicer-multiplayer-studio.webp',
    imageAlt: 'Choicer Voicer studio with the Dub Together multiplayer panel',
    imageWidth: 1200,
    imageHeight: 630,
    blocks: [
      {
        type: 'p',
        text: 'To play multiplayer, open the voice over game and press Open multiplayer in the top right. Before you do, send your pack ZIP to everyone playing - that is the one step rooms fail on. The six steps below take about five minutes.',
      },
      { type: 'h2', text: 'What you need' },
      {
        type: 'ul',
        items: [
          '2-6 players. The pack sets the number: each speaker in it becomes one role.',
          'A microphone each. A silent take cannot be shared to the room.',
          'The same pack ZIP on every device.',
          'Headphones, or the original audio leaks into your take.',
        ],
      },
      {
        type: 'p',
        text: 'Each player records one character of lines, everyone records at the same time, and the scene is done when every line has a take. No score, no timer, no account, and rooms expire six hours after creation.',
      },
      { type: 'h2', text: '1. Send the pack ZIP to everyone' },
      {
        type: 'p',
        text: 'The pack never leaves your device. Only a fingerprint of it reaches the server, and the room checks that everyone matches. So the host sends the file itself first, over any channel, and each player imports it with Upload pack ZIP before joining.',
      },
      {
        type: 'note',
        text: 'Send the original, not a re-export: a rebuilt copy has a different fingerprint and gets refused with "Import the exact ZIP used by this room to continue". This is the step that trips people up.',
      },
      { type: 'h2', text: '2. Create the room' },
      {
        type: 'p',
        text: 'Press Open multiplayer, enter a name, choose the pack, pick your character, then Create room. The line under the pack name is the room size: 14 clips and 2 players needs exactly two people. A pack missing from the dropdown is ineligible, since every role needs at least one line and six speakers is the limit.',
      },
      {
        type: 'image',
        src: '/voiceactinggame/choicer-voicer-multiplayer-create-room.webp',
        alt: 'Create room panel showing name, voice pack and role selection',
        width: 1200,
        height: 800,
      },
      { type: 'h2', text: '3. Invite the others' },
      {
        type: 'p',
        text: 'You get a six-character code such as 23R7AK. Copy invite link beats reading it out, since the link opens the join panel prefilled. To join by hand: Open multiplayer, Join room, code, name, then one of the free roles.',
      },
      { type: 'h2', text: '4. Start the game' },
      {
        type: 'p',
        text: 'Unclaimed roles show OPEN ROLE and the status line tracks what is missing. Everyone presses Ready to play, then the host Start game unlocks. A greyed-out ready button means that player pack does not match, which sends you back to step 1.',
      },
      { type: 'h2', text: '5. Record your lines' },
      {
        type: 'p',
        text: 'Next assigned clip jumps between your own lines and skips everyone else, and the record button will not arm on a character that is not yours. Hear clip plays the original, R records, retries are unlimited. Each take uploads as it is captured and reaches the other players in the background.',
      },
      { type: 'h2', text: '6. Watch and export' },
      {
        type: 'p',
        text: 'Waiting for the others appears once your own lines are done, counting what the room still needs. Keep the tab open. At the last take it becomes Everyone is done, and Watch dub plays the scene with each player in their role. Export works as it does in solo.',
      },
      { type: 'h2', text: 'Worth knowing' },
      {
        type: 'ul',
        items: [
          'Only the voice takes are uploaded, only to the room, and they are deleted within 24 hours.',
          'Closed the tab by accident? Rejoin the same room in the same role. Shared takes survive.',
          'If a player leaves, their role reopens and their unrecorded lines wait for a replacement.',
        ],
      },
      { type: 'cta', label: 'See every voice-controlled game', href: '/' },
    ],
  },
  {
    slug: 'voice-over-game-on-mac',
    title: 'Voice Over Game on Mac: Play Choicer Voicer in Your Browser',
    excerpt:
      'The voice over game runs in Safari, Chrome, Edge, and Firefox on macOS with no install and no account. Here is how to record your first dub.',
    date: 'August 13, 2026',
    isoDate: '2026-08-13',
    tag: 'Guides',
    image: '/voiceactinggame/choicer-voicer-social-preview.png',
    imageAlt: 'Voice over game on Mac: dub studio running in the browser',
    imageWidth: 1200,
    imageHeight: 630,
    blocks: [
      {
        type: 'p',
        text: 'Choicer Voicer is a free voice-over game that runs in the browser, so any Mac can play it without an install. Open the voice over game studio in Safari, Chrome, Edge, or Firefox, allow the microphone, and you can have a scene dubbed in a few minutes.',
      },
      { type: 'h2', text: 'Does it work on macOS?' },
      {
        type: 'p',
        text: 'Yes. There is no installer and no App Store listing, and Apple silicon and Intel Macs behave the same way. Safari handles it, so there is no reason to install Chrome for this. One thing worth knowing before you import anything: packs live in the storage of whichever browser you imported them in. A pack you added in Safari will not appear on the rack in Chrome.',
      },
      { type: 'h2', text: 'What you need' },
      {
        type: 'ul',
        items: [
          'Safari, Chrome, Edge, or Firefox.',
          'A microphone. The one built into a MacBook is good enough to start.',
          'Headphones. Without them the original line leaks into your take through the speakers.',
          'A voice pack, which is a ZIP you import once.',
        ],
      },
      { type: 'h2', text: 'Recording your first dub' },
      {
        type: 'ul',
        items: [
          'Import a pack. The tape rack starts empty, so choose Upload pack ZIP and drop the file on the import panel. It unpacks into browser storage and stays on the rack.',
          'Accept the microphone prompt the first time you record. To use a different input, open Choose mic in the right-hand panel.',
          'Press Hear clip for the original delivery. Listen to the pacing rather than the words, since coming in half a beat late is what makes a take sound off.',
          'Press Start recording, or tap R. The video plays silently as a lip-sync cue, your take plays back straight away, re-recording overwrites it, and retries are unlimited.',
          'Check the waveform under the monitor. Your take is drawn over the original: sitting to the right means you came in late, much taller means you are louder than the scene.',
          'When every line has a take, Watch dub plays the scene in your voice and Export video renders it to a file.',
        ],
      },
      { type: 'h2', text: 'Allowing the microphone on macOS' },
      {
        type: 'p',
        text: 'Recording fails quietly if either permission is missing: macOS has to let the browser use the mic, and the browser has to let the site use it. Start in System Settings, Privacy and Security, Microphone and check that your browser is switched on, then set the site permission and reload.',
      },
      { type: 'h3', text: 'Safari' },
      {
        type: 'p',
        text: 'With the studio open, go to Safari, Settings for This Website and set Microphone to Allow. The same list lives under Safari, Settings, Websites, Microphone.',
      },
      { type: 'h3', text: 'Chrome and Edge' },
      {
        type: 'p',
        text: 'Click the icon at the left of the address bar, then allow the microphone for the site. In Chrome you can also open the site settings under Privacy and Security and remove it from the blocked list.',
      },
      { type: 'h3', text: 'Firefox' },
      {
        type: 'p',
        text: 'Click the padlock in the address bar, clear any blocked microphone permission, then reload and accept the prompt when it comes back.',
      },
      { type: 'note', text: 'Takes are never uploaded. They stay in your browser storage on your own Mac.' },
      { type: 'h2', text: 'Getting a better take on a MacBook' },
      { type: 'p', text: 'The built-in mic is fine. Where you sit matters more than what you record with.' },
      {
        type: 'ul',
        items: [
          'Sit closer to the mic than feels natural, then perform slightly quieter. It reads as present instead of shouted.',
          'Avoid bare kitchens and bathrooms. They add reverb you cannot remove afterwards.',
          'On AirPods or a USB mic, select it under Choose mic. The browser does not always follow the macOS default input.',
          'Dub the whole pack once before going back to perfect any single line.',
        ],
      },
      { type: 'h2', text: 'FAQ' },
      { type: 'h3', text: 'Do I need to download anything on my Mac?' },
      { type: 'p', text: 'No app and no extension. The only download is a voice pack ZIP.' },
      { type: 'h3', text: 'Is it free?' },
      { type: 'p', text: 'Yes, and there is no account to create.' },
      { type: 'h3', text: 'Which browser works best?' },
      { type: 'p', text: 'Chrome and Edge handle the longer export renders more smoothly. Safari is fine for recording.' },
      { type: 'h3', text: 'Can I make a pack from my own video?' },
      {
        type: 'p',
        text: 'Yes. The Pack Maker marks each line on a timeline, extracts the audio and frames locally, and generates a ZIP ready to import.',
      },
      { type: 'cta', label: 'Back to the voice over game', href: '/voice-over-game' },
    ],
  },
  {
    slug: 'top-5-voice-games',
    title: 'Top 5 Voice Games That Only Use Your Microphone',
    excerpt: 'Discover the most innovative games that turn your voice into a controller.',
    date: 'January 9, 2025',
    isoDate: '2025-01-09',
    tag: 'Game Reviews',
    image: '/voiceactinggame/screenshot4.webp',
    imageAlt: 'Top 5 voice games that only use your microphone',
    imageWidth: 1200,
    imageHeight: 630,
    blocks: [
      {
        type: 'p',
        text: 'Microphone games replace the controller with your own voice. These five are the ones worth playing first, and three of them are playable in the browser right here.',
      },
      { type: 'h2', text: '1. Scream Chicken! Run' },
      {
        type: 'p',
        text: 'Your voice becomes the controller. The louder you scream, the higher your chicken flies through increasingly challenging obstacle courses. With its balance of accessibility and challenge, Scream Chicken is both funny and genuinely hard to put down.',
      },
      {
        type: 'ul',
        items: [
          'Intuitive voice-based controls',
          'Progressive difficulty system',
          'Party mode with friends',
          'Regular content updates',
        ],
      },
      { type: 'cta', label: 'Play Scream Chicken! Run', href: '/game/scream-chicken' },
      { type: 'h2', text: '2. Voice Through - Perfect Pitch Challenge' },
      {
        type: 'p',
        text: 'Master your pitch in this musical training game where your voice guides a ball through note walls. Sing higher or lower to navigate, while the game gives real-time feedback to improve your vocal accuracy.',
      },
      {
        type: 'ul',
        items: [
          'Pitch-based voice controls',
          'Real-time vocal feedback',
          'Progressive difficulty levels',
          'Musical training elements',
        ],
      },
      { type: 'cta', label: 'Read about Voice Through', href: '/game/voice-through' },
      { type: 'h2', text: '3. Racing Pitch' },
      {
        type: 'p',
        text: 'Become your car engine in this voice-controlled racing game. Mimic engine sounds with your voice to control your speed - the better your engine impression, the faster you go. When you need a breather, switch to the relaxing hot-air balloon mode instead.',
      },
      {
        type: 'ul',
        items: [
          'Voice-powered racing mechanics',
          'Party game modes',
          'Track challenges',
          'Unique balloon flight mode',
        ],
      },
      { type: 'h2', text: '4. One Hand Clapping' },
      {
        type: 'p',
        text: 'A magical musical adventure where your voice is the key to everything. Sing to solve puzzles, create platforms, and shape the world around you. The game encourages players to express themselves through singing, regardless of their musical ability.',
      },
      {
        type: 'ul',
        items: [
          'Sing to solve puzzles',
          'Musical world-building',
          'Creative vocal expression',
          'Supportive, no-judgment gameplay',
        ],
      },
      { type: 'h2', text: '5. YASUHATI / With your voice!' },
      {
        type: 'p',
        text: 'Choose between keyboard or voice controls to guide Note-chan through various obstacles. The higher your pitch, the higher Note-chan jumps, so you vocalize at different levels throughout the game.',
      },
      {
        type: 'ul',
        items: [
          'Voice pitch controls',
          'Keyboard control option',
          'Progressive obstacles',
          'Engaging musical gameplay',
        ],
      },
      { type: 'cta', label: 'Try the vocal range test', href: '/game/vocal-range-test' },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function BlogIndex() {
  return (
    <div className="vag-wrap">
      <div className="vag-post-grid">
        {posts.map((post) => (
          <article className="vag-post-card" key={post.slug}>
            <Image
              src={post.image}
              alt={post.imageAlt}
              width={post.imageWidth}
              height={post.imageHeight}
              sizes="(max-width: 720px) 100vw, 380px"
            />
            <div className="vag-post-card-body">
              <span className="vag-post-tag">{post.tag}</span>
              <h3>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.excerpt}</p>
              <div className="vag-post-meta">
                <span>{post.date}</span>
                <Link href={`/blog/${post.slug}`}>
                  <strong>Read More</strong>
                  <ArrowRight size={14} style={{ display: 'inline', marginLeft: 6 }} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function BlogPost({ post }: { post: Post }) {
  return (
    <article className="vag-post">
      <Link href="/blog" className="vag-eyebrow" style={{ display: 'inline-block' }}>
        Back to Blog
      </Link>
      <p style={{ color: '#64748b', margin: '10px 0 0' }}>
        {post.date} <span style={{ color: '#3b82f6', fontWeight: 600 }}>{post.tag}</span>
      </p>
      <h1>{post.title}</h1>
      {post.blocks.map((block, index) => {
        const key = `${post.slug}-${index}`;
        switch (block.type) {
          case 'h2':
            return <h2 key={key}>{block.text}</h2>;
          case 'h3':
            return <h3 key={key}>{block.text}</h3>;
          case 'ul':
            return (
              <ul key={key}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case 'note':
            return (
              <div className="vag-note" key={key}>
                <p>{block.text}</p>
              </div>
            );
          case 'image':
            return (
              <Image
                key={key}
                src={block.src}
                alt={block.alt}
                width={block.width}
                height={block.height}
                sizes="(max-width: 830px) 100vw, 830px"
                style={{ borderRadius: 16, width: '100%', height: 'auto', margin: '18px 0' }}
              />
            );
          case 'cta':
            return (
              <p key={key} style={{ margin: '18px 0' }}>
                <Link href={block.href} className="vag-btn vag-btn--blue">
                  {block.label}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </p>
            );
          default:
            return <p key={key}>{block.text}</p>;
        }
      })}
    </article>
  );
}