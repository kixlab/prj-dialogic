import { configureStore } from '@reduxjs/toolkit';
import { default as phase } from './phaseSlice';
import { default as data } from './dataSlice';

export const store = configureStore({
  reducer: { phase, data },
});

export type RootStore = ReturnType<typeof store.getState>;