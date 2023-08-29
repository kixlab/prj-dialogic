import { GenerationItem, LevelInfo, PatternInfo, UtteranceItem } from "./types";

export const rootState: RootState = {
  phase: {
    base: false,
    phase: 0,
    done: false,
    next: false,
    magic: false,
    loading: false,
  },
  userData: {
    script: null,
    fullScript: null,
    selections: [],
    targets: [],
    scenario: {
      tutee: 1,
      context: '',
      scenario: '',
    },
    rubric: null,
    reasons: ['', '']
  },
  data: {
    video: null,
    fullVideo: null,
    description: 'Sample Description',
    magicItem: null,
    generation: [],
  },
  dialogue: {
    title: 'Sample Title',
    summary: 'Sample Summary',
    strategy: [],
    pattern: [],
    patternHover: null,
    dialogue: [],
    speaker: 2,
    level: [],
    scenario: 'Sample Scenario'
  },
  author: {
    focus: null,
  }
};

export interface RootState {
  phase: {
    base: boolean;
    phase: number,
    done: boolean,
    next: boolean,
    magic: boolean,
    loading: boolean,
  };
  userData: {
    script: string | null,
    fullScript: string | null,
    selections: { start: number, end: number }[],
    targets: number[],
    scenario: {
      tutee: number,
      context: string,
      scenario: string,
    },
    rubric: string | null,
    reasons: string[],
  };
  data: {
    video: string | null,
    fullVideo: string | null,
    description: string,
    magicItem: number | null,
    generation: GenerationItem[]
  };
  dialogue: {
    title: string,
    summary: string,
    strategy: string[],
    pattern: PatternInfo[],
    patternHover: number | null,
    dialogue: UtteranceItem[],
    speaker: number,
    level: LevelInfo[]
    scenario: string
  };
  author: {
    focus: string | null,
  }
}