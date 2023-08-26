import { LevelInfo, PatternInfo, UtteranceItem } from "./types";

export const rootState: RootState = {
  phase: {
    phase: 0,
    done: false,
    next: false,
    magic: false,
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
  },
  data: {
    video: null,
    fullVideo: null,
    description: 'Sample Description',
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
    phase: number,
    done: boolean,
    next: boolean,
    magic: boolean,
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
  };
  data: {
    video: string | null,
    fullVideo: string | null,
    description: string | null,
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