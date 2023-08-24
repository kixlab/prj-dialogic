import { UtteranceItem } from "@/pages/task/author/utils";

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
    speaker: number,
  };
  author: {
    focus: string | null,
  }
}