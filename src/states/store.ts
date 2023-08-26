import { configureStore } from '@reduxjs/toolkit';
import { default as phase } from './phaseSlice';
import { default as data } from './dataSlice';
import { default as author } from './authorSlice';
import { default as userData } from './userDataSlice';
import { default as dialogue } from './dialogueSlice'

export const store = configureStore({
  reducer: { phase, data, author, userData, dialogue },
});

export type RootStore = ReturnType<typeof store.getState>;