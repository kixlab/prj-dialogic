import { configureStore } from '@reduxjs/toolkit';
import { default as phase } from './phaseSlice';
import { default as data } from './dataSlice';
import { default as author } from './authorSlice';

export const store = configureStore({
  reducer: { phase, data, author },
});

export type RootStore = ReturnType<typeof store.getState>;