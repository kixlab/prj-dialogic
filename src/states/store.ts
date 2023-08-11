import { configureStore } from '@reduxjs/toolkit';
import { default as phase } from './phaseSlice';

export const store = configureStore({
  reducer: { phase },
});

export type RootStore = ReturnType<typeof store.getState>;