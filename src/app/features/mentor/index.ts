import { createSlice } from '@reduxjs/toolkit';
import { IMentor } from '../../interfaces/IMentor';
import { IMentorFull } from '../../interfaces/IMentorFull';
import { getMentors } from './thunks/getMentors';
import { getMentorById } from './thunks/getMentorById';

export type MentorState = {
  // mentors: {
    entities: IMentor[];
    mentorPage?: IMentorFull;
    totalMentorsCount: number,
    isLoading: boolean;
    error: string | undefined;
  // };
};

const initialState: MentorState = {
  // mentors: {
    entities: [],
    totalMentorsCount: 0,
    isLoading: false,
    error: undefined,
  // },
};

const mentorSlice = createSlice({
  name: 'mentor',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(getMentors.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getMentors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.entities = action.payload.mentors;
      state.totalMentorsCount = action.payload.totalMentorsCount;
    });

    builder.addCase(getMentors.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(getMentorById.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getMentorById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.mentorPage = action.payload.user;
    });

    builder.addCase(getMentorById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default mentorSlice.reducer;
