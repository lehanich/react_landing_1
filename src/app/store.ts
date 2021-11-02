import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter';
import tagReducer from './features/tag';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tag: tagReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;