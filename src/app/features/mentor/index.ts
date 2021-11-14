import { createSlice } from '@reduxjs/toolkit';
import { IMentor } from '../../interfaces/IMentor';
import { IMentorCard } from '../../interfaces/IMentorCard';
import { getMentors } from './thunks/getMentors';
import { getMentorById } from './thunks/getMentorById';

export type MentorState = {
  listing: {
    mentors: {
      entities: IMentorCard[] | null;
      count: number;
      isLoading: boolean;
      error: string | undefined;
    };
    paginations: {
      page: number;
      limit: number;
    }
  };
  mentor: {
    entity: IMentor | null;
    isLoading: boolean;
    error: string | undefined;
  };
};

const initialState: MentorState = {
  listing: {
    mentors: {
      entities: null,
      count: 0,
      isLoading: false,
      error: undefined,
    },
    paginations: {
      page: 1,
      limit: 10
    }
  },
  mentor: {
    entity: null,
    isLoading: false,
    error: undefined,
  }
};

const mentorSlice = createSlice({
  name: 'mentor',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(getMentors.pending, (state) => {
      state.listing.mentors.isLoading = true;
    });

    builder.addCase(getMentors.fulfilled, (state, action) => {
      state.listing.mentors.isLoading = false;
      state.listing.mentors.entities = [];
      state.listing.mentors.entities = action.payload.mentors;
      state.listing.mentors.count = action.payload.totalMentorsCount;
    });

    builder.addCase(getMentors.rejected, (state, action) => {
      state.listing.mentors.isLoading = false;
      state.listing.mentors.error = action.error.message;
    });

    builder.addCase(getMentorById.pending, (state) => {
      state.mentor.isLoading = true;
    });

    builder.addCase(getMentorById.fulfilled, (state, action) => {
      state.mentor.isLoading = false;
      state.mentor.entity = action.payload.user;
    });

    builder.addCase(getMentorById.rejected, (state, action) => {
      state.mentor.isLoading = false;
      state.mentor.error = action.error.message;
    });
  },
});

export default mentorSlice.reducer;
