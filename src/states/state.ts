export const rootState: RootState = {
  phase: {
    phase: 0,
    done: false
  },
};

export interface RootState {
  phase: {
    phase: number,
    done: boolean,
  };
}