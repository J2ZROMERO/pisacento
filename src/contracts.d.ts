type Foot = 'left' | 'right';
type BachataCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type BachataSourceId = 'heritage' | 'basic' | 'count' | 'styles' | 'sensual';
type BachataVariantId = 'traditional' | 'modern' | 'sensual';
type BachataInstrumentId = 'bongo' | 'guira' | 'bass' | 'segunda' | 'requinto';
interface EvidenceSource { name: string; url: string; type: string; scope: string }
interface BachataVariant { name: string; text: string; sources: BachataSourceId[] }
interface BachataFrame { count: BachataCount; foot: Foot; tap: boolean; weight: Foot | null }
interface BachataAPI {
  sources: Record<BachataSourceId, EvidenceSource>;
  variants: Record<BachataVariantId, BachataVariant>;
  frame(count: BachataCount, first?: Foot): BachataFrame;
}
interface BachataInstrument {
  name: string; icon: string; track: number; slug: string; original: string;
  role: string; note: string; hits: number[] | null; accents: number[];
  countTrack?: number; countSlug?: string; bassHits?: number[];
}
interface BachataInstrumentAPI {
  album: string; source: string;
  instruments: Record<BachataInstrumentId, BachataInstrument>;
  playerUrl(id: number): string;
  slots(key: BachataInstrumentId): number[] | null;
}
type FootDirection = 'center' | 'front' | 'back' | 'left' | 'right' | 'cross';
interface FeetFrame {
  positions: Record<Foot, FootDirection>; foot: Foot; newStep: boolean;
  active: boolean; stepSub: number; direction: FootDirection; sync: boolean;
}
interface FeetAPI {
  colors: string[];
  frame(sub: number, style: string, type: string, centerBell?: boolean): FeetFrame;
}
interface TimelineAPI {
  beatAt(time: number, beats: readonly number[] | null | undefined, bpm: number, offset: number): number;
  timeAt(beat: number, beats: readonly number[] | null | undefined, bpm: number, offset: number): number;
}
interface Window {
  CompasBachata: BachataAPI;
  CompasBachataInstruments: BachataInstrumentAPI;
  CompasFeet: FeetAPI;
  CompasTimeline: TimelineAPI;
}
// Small CommonJS bridge retained for existing Node tests; browser scripts use Window.
declare const module: { exports: unknown };
