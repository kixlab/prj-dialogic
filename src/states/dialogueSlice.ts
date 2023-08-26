import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { rootState } from './state';
import { LevelInfo, PatternInfo, UtteranceItem } from './types';
import { v4 as uuid } from 'uuid';

const dialogueSlice = createSlice({
  name: 'dialogue',
  initialState: rootState.dialogue,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateSummary: (state, action: PayloadAction<string>) => {
      state.summary = action.payload;
    },
    updateStrategy: (state, action: PayloadAction<string[]>) => {
      state.strategy = action.payload;
    },
    updatePattern: (state, action: PayloadAction<PatternInfo[]>) => {
      state.pattern = action.payload;
    },
    updatePatternHover: (state, action: PayloadAction<number | null>) => {
      state.patternHover = action.payload;
    },
    updateDialogue: (state, action: PayloadAction<UtteranceItem[]>) => {
      state.dialogue = action.payload;
    },
    updateSpeaker: (state, action: PayloadAction<number>) => {
      state.speaker = action.payload;
    },
    updateLevel: (state, action: PayloadAction<LevelInfo[]>) => {
      state.level = action.payload;
    },
    updateScenario: (state, action: PayloadAction<string>) => {
      state.scenario = action.payload;
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

export const { updateTitle, updateDialogue, updatePatternHover, updateLevel, updatePattern, updateScenario, updateSpeaker, updateStrategy, updateSummary, updateUtterance, addUtterance, changeSpeaker, duplicateUtterance, deleteUtterance } = dialogueSlice.actions;
export default dialogueSlice.reducer;