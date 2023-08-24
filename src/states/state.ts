import { UtteranceItem } from "./types";

export const rootState: RootState = {
  phase: {
    phase: 0,
    done: false,
    next: false
  },
  data: {
    video: null,
    script: '',
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
  };
  data: {
    video: string | null,
    script: string,
    dialogue: UtteranceItem[],
    title: string,
    description: string,
    speaker: number,
  };
  author: {
    focus: string | null,
  }
}