import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { rootState } from './state';
import { v4 as uuid } from 'uuid';
import { UtteranceItem } from './types';

const dataSlice = createSlice({
  name: 'data',
  initialState: rootState.data,
  reducers: {
    updateVideo: (state, action: PayloadAction<string>) => {
      state.video = action.payload;
    },
    initVideo: (state) => {
      state.video = null;
    },
    updateScript: (state, action: PayloadAction<string>) => {
      state.script = action.payload;
    },
    updateDialogue: (state, action: PayloadAction<UtteranceItem[]>) => {
      state.dialogue = action.payload;
    },
    updateUtterance: (state, action: PayloadAction<UtteranceItem>) => {
      const { id, speaker, utterance } = action.payload;

      state.dialogue.forEach((item) => {
        if (item.id == id) {
          item.speaker = speaker;
          item.utterance = utterance;
        }
      })
    },
    changeSpeaker: (state, action: PayloadAction<string>) => {
      const utterance = state.dialogue.find((item) => item.id === action.payload);
      if (utterance) {
        utterance.speaker = (utterance.speaker + 1) % state.speaker;
      }
    },
    addUtterance: (state) => {
      state.dialogue.push({ id: uuid(), speaker: 0, utterance: '' });
    },
    duplicateUtterance: (state, action: PayloadAction<string>) => {
      const idx = state.dialogue.findIndex((item) => item.id === action.payload);
      state.dialogue.splice(idx, 0, { ...state.dialogue[idx], id: uuid() });
    },
    deleteUtterance: (state, action: PayloadAction<string>) => {
      const idx = state.dialogue.findIndex((item) => item.id === action.payload);
      state.dialogue.splice(idx, 1);
    },
  }
})

export const { updateVideo, initVideo, updateScript, updateDialogue, updateUtterance, addUtterance, changeSpeaker, duplicateUtterance, deleteUtterance } = dataSlice.actions;
export default dataSlice.reducer;