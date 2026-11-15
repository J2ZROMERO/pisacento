type Foot = 'left' | 'right';
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
  CompasFeet: FeetAPI;
  CompasTimeline: TimelineAPI;
}
// Small CommonJS bridge retained for existing Node tests; browser scripts use Window.
declare const module: { exports: unknown };
