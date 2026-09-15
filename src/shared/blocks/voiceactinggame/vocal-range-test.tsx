'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Mic, RotateCcw } from 'lucide-react';

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const LADDER_LOW = 33; // A1
const LADDER_HIGH = 86; // D6

type Singer = {
  name: string;
  gender: 'F' | 'M';
  low: number;
  high: number;
};

const SINGERS: Singer[] = [
  { name: 'Mavis Staples', gender: 'F', low: 52, high: 69 },
  { name: 'Bobby Bland', gender: 'M', low: 53, high: 72 },
  { name: 'Melanie Martinez', gender: 'F', low: 54, high: 74 },
  { name: 'Gladys Knight', gender: 'F', low: 54, high: 74 },
  { name: 'Patti Smith', gender: 'F', low: 45, high: 62 },
  { name: 'John Fogerty', gender: 'M', low: 43, high: 64 },
  { name: 'Morrissey', gender: 'M', low: 45, high: 67 },
  { name: 'Darlene Love', gender: 'F', low: 57, high: 76 },
  { name: 'Chuck Berry', gender: 'M', low: 46, high: 69 },
  { name: 'Billie Holiday', gender: 'F', low: 53, high: 77 },
  { name: 'Maria Brink', gender: 'F', low: 53, high: 77 },
  { name: 'Birdy', gender: 'F', low: 53, high: 78 },
];

const VOICE_TYPES: { label: string; low: number; high: number }[] = [
  { label: 'Bass', low: 40, high: 64 },
  { label: 'Baritone', low: 45, high: 69 },
  { label: 'Tenor', low: 48, high: 72 },
  { label: 'Contralto', low: 52, high: 74 },
  { label: 'Mezzo-soprano', low: 57, high: 79 },
  { label: 'Soprano', low: 60, high: 84 },
];

export function midiToName(midi: number): string {
  const rounded = Math.round(midi);
  const octave = Math.floor(rounded / 12) - 1;
  return `${NOTE_NAMES[((rounded % 12) + 12) % 12]}${octave}`;
}

export function pitchToMidi(frequency: number): number {
  return 69 + 12 * Math.log2(frequency / 440);
}

/**
 * Autocorrelation based fundamental frequency estimate. Returns 0 when the
 * signal is too quiet or no stable pitch is found.
 */
export function detectPitch(buffer: Float32Array, sampleRate: number): number {
  let rms = 0;
  for (let i = 0; i < buffer.length; i += 1) {
    rms += buffer[i] * buffer[i];
  }
  rms = Math.sqrt(rms / buffer.length);
  if (rms < 0.01) {
    return 0;
  }

  let start = 0;
  let end = buffer.length - 1;
  const threshold = 0.2;
  for (let i = 0; i < buffer.length / 2; i += 1) {
    if (Math.abs(buffer[i]) < threshold) {
      start = i;
      break;
    }
  }
  for (let i = 1; i < buffer.length / 2; i += 1) {
    if (Math.abs(buffer[buffer.length - i]) < threshold) {
      end = buffer.length - i;
      break;
    }
  }

  const trimmed = buffer.slice(start, end);
  const size = trimmed.length;
  if (size < 256) {
    return 0;
  }

  const correlations = new Float32Array(size);
  for (let lag = 0; lag < size; lag += 1) {
    let sum = 0;
    for (let i = 0; i < size - lag; i += 1) {
      sum += trimmed[i] * trimmed[i + lag];
    }
    correlations[lag] = sum;
  }

  let d = 0;
  while (d < size - 1 && correlations[d] > correlations[d + 1]) {
    d += 1;
  }

  let maxValue = -1;
  let maxLag = -1;
  for (let lag = d; lag < size; lag += 1) {
    if (correlations[lag] > maxValue) {
      maxValue = correlations[lag];
      maxLag = lag;
    }
  }

  if (maxLag <= 0) {
    return 0;
  }

  const frequency = sampleRate / maxLag;
  if (frequency < 60 || frequency > 1200) {
    return 0;
  }
  return frequency;
}

function estimatePercentile(lowMidi: number, highMidi: number): string {
  const span = highMidi - lowMidi;
  if (span <= 0) {
    return 'n/a';
  }
  if (span >= 30) return '95th';
  if (span >= 26) return '90th';
  if (span >= 22) return '80th';
  if (span >= 18) return '65th';
  if (span >= 14) return '50th';
  if (span >= 10) return '35th';
  return '20th';
}

export function VocalRangeTest() {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('Tap start, then hum or sing a comfortable note.');
  const [frequency, setFrequency] = useState(0);
  const [lowMidi, setLowMidi] = useState<number | null>(null);
  const [highMidi, setHighMidi] = useState<number | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frameRef = useRef<number | null>(null);
  const bufferRef = useRef<Float32Array<ArrayBuffer> | null>(null);
  const activeNoteRef = useRef<HTMLSpanElement | null>(null);
  const ladderRef = useRef<HTMLDivElement | null>(null);

  const stop = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    analyserRef.current = null;
    bufferRef.current = null;
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => undefined);
    }
    audioContextRef.current = null;
    setIsListening(false);
  }, []);

  useEffect(() => stop, [stop]);

  const analyse = useCallback(() => {
    const analyser = analyserRef.current;
    const buffer = bufferRef.current;
    const context = audioContextRef.current;
    if (!analyser || !buffer || !context) {
      return;
    }

    analyser.getFloatTimeDomainData(buffer);
    const detected = detectPitch(buffer, context.sampleRate);

    if (detected > 0) {
      setFrequency(detected);
      const midi = pitchToMidi(detected);
      setLowMidi((previous) => (previous === null ? midi : Math.min(previous, midi)));
      setHighMidi((previous) => (previous === null ? midi : Math.max(previous, midi)));
    } else {
      setFrequency(0);
    }

    frameRef.current = requestAnimationFrame(analyse);
  }, []);

  const start = useCallback(async () => {
    if (isListening) {
      stop();
      setStatus('Test stopped. Start again to keep measuring.');
      return;
    }

    try {
      setStatus('Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      streamRef.current = stream;

      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const context = new AudioContextClass();
      audioContextRef.current = context;
      if (context.state === 'suspended') {
        await context.resume();
      }

      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);

      analyserRef.current = analyser;
      bufferRef.current = new Float32Array(analyser.fftSize);

      setIsListening(true);
      setStatus('Listening. Sing up and down to map your range.');
      frameRef.current = requestAnimationFrame(analyse);
    } catch (error) {
      stop();
      setIsListening(false);
      setStatus(
        'Microphone access is blocked. Allow the microphone in your browser to run the test.'
      );
      console.error('vocal range test failed', error);
    }
  }, [analyse, isListening, stop]);

  const reset = useCallback(() => {
    setLowMidi(null);
    setHighMidi(null);
    setFrequency(0);
    setStatus('Reset. Tap start to measure your range again.');
  }, []);

  const currentMidi = frequency > 0 ? pitchToMidi(frequency) : null;
  const activeMidi = currentMidi !== null ? Math.round(currentMidi) : null;

  const ladderNotes = useMemo(() => {
    const notes: number[] = [];
    for (let midi = LADDER_HIGH; midi >= LADDER_LOW; midi -= 1) {
      notes.push(midi);
    }
    return notes;
  }, []);

  useEffect(() => {
    if (!ladderRef.current || !activeNoteRef.current) {
      return;
    }
    const container = ladderRef.current;
    const node = activeNoteRef.current;
    container.scrollTop = node.offsetTop - container.clientHeight / 2 + node.clientHeight / 2;
  }, [activeMidi]);

  const rangeLabel =
    lowMidi !== null && highMidi !== null
      ? `${midiToName(lowMidi)} - ${midiToName(highMidi)}`
      : '-- - --';

  const voiceType = useMemo(() => {
    if (lowMidi === null || highMidi === null) {
      return '--';
    }
    const average = (lowMidi + highMidi) / 2;
    let best = VOICE_TYPES[0];
    let bestDistance = Number.MAX_VALUE;
    VOICE_TYPES.forEach((type) => {
      const distance = Math.abs((type.low + type.high) / 2 - average);
      if (distance < bestDistance) {
        best = type;
        bestDistance = distance;
      }
    });
    return best.label;
  }, [highMidi, lowMidi]);

  const percentile =
    lowMidi !== null && highMidi !== null ? estimatePercentile(lowMidi, highMidi) : 'n/a';

  const comparisonRows = useMemo(() => {
    const rows =
      lowMidi !== null && highMidi !== null
        ? [{ name: 'You', gender: 'YOU' as const, low: lowMidi, high: highMidi }, ...SINGERS]
        : SINGERS;
    const domainLow = 36;
    const domainHigh = 86;
    const span = domainHigh - domainLow;
    return rows.map((row) => ({
      ...row,
      left: ((Math.max(domainLow, row.low) - domainLow) / span) * 100,
      width: ((Math.min(domainHigh, row.high) - Math.max(domainLow, row.low)) / span) * 100,
      range: `${midiToName(row.low)} - ${midiToName(row.high)}`,
    }));
  }, [highMidi, lowMidi]);

  return (
    <div>
      <div className="vag-tool">
        <div className="vag-tool-actions">
          <button type="button" className="vag-btn vag-btn--blue" onClick={start}>
            <Mic size={18} aria-hidden="true" />
            {isListening ? 'Stop Test' : 'Start Test'}
          </button>
          <button type="button" className="vag-btn vag-btn--slate" onClick={reset}>
            <RotateCcw size={18} aria-hidden="true" />
            Reset
          </button>
        </div>

        <div className="vag-metrics">
          <div className="vag-metric">
            <span className="vag-metric-label">Range</span>
            <span className="vag-metric-value">{rangeLabel}</span>
            <span className="vag-metric-hint">
              {lowMidi !== null && highMidi !== null
                ? `${Math.round(highMidi - lowMidi + 1)} semitones measured`
                : 'no notes detected yet'}
            </span>
          </div>
          <div className="vag-metric">
            <span className="vag-metric-label">Voice type</span>
            <span className="vag-metric-value">{voiceType}</span>
            <span className="vag-metric-hint">based on your detected range</span>
          </div>
          <div className="vag-metric">
            <span className="vag-metric-label">Percentile</span>
            <span className="vag-metric-value">{percentile}</span>
            <span className="vag-metric-hint">compared with typical singers</span>
          </div>
        </div>

        <div className="vag-ladder-wrap">
          <div className="vag-ladder-col" aria-hidden="true">
            {ladderNotes.slice(0, 26).map((midi) => (
              <span
                key={`left-${midi}`}
                className="vag-ladder-note"
                data-inchart={midi >= 36 && midi <= 86 ? 'true' : 'false'}
                data-active={activeMidi === midi ? 'true' : 'false'}
              >
                {midiToName(midi)}
              </span>
            ))}
          </div>

          <div className="vag-pitcher" data-active={frequency > 0 ? 'true' : 'false'}>
            <span className="vag-pitcher-note">
              {activeMidi !== null ? midiToName(activeMidi) : '--'}
            </span>
            <span className="vag-pitcher-hz">
              {frequency > 0 ? `${frequency.toFixed(1)} Hz` : '0 Hz'}
            </span>
            <span className="vag-pitcher-hz">live pitch</span>
          </div>

          <div
            className="vag-ladder-col vag-ladder-col--right"
            ref={ladderRef}
            style={{ overflowY: 'auto', maxHeight: 380 }}
            aria-hidden="true"
          >
            {ladderNotes.slice(26).map((midi) => (
              <span
                key={`right-${midi}`}
                ref={activeMidi === midi ? activeNoteRef : undefined}
                className="vag-ladder-note"
                data-active={activeMidi === midi ? 'true' : 'false'}
              >
                {midiToName(midi)}
              </span>
            ))}
          </div>
        </div>

        <p className="vag-tool-status" role="status">
          {status}
        </p>
      </div>

      <div className="vag-compare-card" id="comparisons-section">
        <p className="vag-eyebrow">Comparisons</p>
        <h3 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 18px' }}>
          How your range stacks up
        </h3>
        {comparisonRows.map((row) => (
          <div className="vag-compare-row" key={row.name}>
            <div className="vag-compare-top">
              <span style={{ color: row.name === 'You' ? '#0f172a' : undefined }}>{row.name}</span>
              <span>{row.range}</span>
            </div>
            <div className="vag-compare-track">
              <div
                className={`vag-compare-bar ${
                  row.name === 'You'
                    ? 'vag-compare-bar--you'
                    : row.gender === 'F'
                      ? 'vag-compare-bar--f'
                      : 'vag-compare-bar--m'
                }`}
                style={{ left: `${row.left}%`, width: `${Math.max(row.width, 6)}%` }}
              >
                {row.name === 'You' ? 'You' : row.name.split(' ')[0]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
