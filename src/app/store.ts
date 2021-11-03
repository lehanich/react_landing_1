import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter';
import tagReducer from './features/tag';
import mentorReducer from './features/mentor';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tag: tagReducer,
    mentors: mentorReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;