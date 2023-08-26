import { UtteranceItem } from "./types";

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
    dialogue: [],
    title: 'Sample Title',
    description: 'Sample Description',
    speaker: 2,
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

    dialogue: UtteranceItem[],
    title: string,
    description: string | null,
    speaker: number,
  };
  author: {
    focus: string | null,
  }
}