export const rootState: RootState = {
  phase: {
    phase: 0,
    done: false,
    next: false
  },
  gen: {
    video: null,
  }
};

export interface RootState {
  phase: {
    phase: number,
    done: boolean,
    next: boolean,
  };
  gen: {
    video: string | null,
  }
}