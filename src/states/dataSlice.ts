import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { rootState } from './state';
import { UtteranceItem } from '@/pages/task/author/utils';

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

    }
  }
})

export const { updateVideo, initVideo, updateScript, updateDialogue, updateUtterance } = dataSlice.actions;
export default dataSlice.reducer;