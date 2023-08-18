export const rootState: RootState = {
  phase: {
    phase: 0,
    done: false
  },
  gen: {
    video: null,
  }
};

export interface RootState {
  phase: {
    phase: number,
    done: boolean,
  };
  gen: {
    video: string | null,
  }
}