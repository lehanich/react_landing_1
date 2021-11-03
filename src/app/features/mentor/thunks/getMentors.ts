import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMentors } from '../../../interfaces/IMentors'
import { MentorApi } from './MentorApi';

export const getMentors = createAsyncThunk (
  'mentor/getFiltered',
  async () => {
    const mentors = await MentorApi.POST<IMentors>('getFiltered');
    return mentors;
  }
)