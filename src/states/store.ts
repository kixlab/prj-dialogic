import { configureStore } from '@reduxjs/toolkit';
import { default as phase } from './phaseSlice';
import { default as gen } from './genSlice';

export const store = configureStore({
  reducer: { phase, gen },
});

export type RootStore = ReturnType<typeof store.getState>;