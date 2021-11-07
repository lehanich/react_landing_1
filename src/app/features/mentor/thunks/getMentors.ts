import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMentors } from '../../../interfaces/IMentors';
import { MentorApi } from './MentorApi';

export const getMentors = createAsyncThunk (
  'mentor/getFiltered',
  async (allFilters?: any) => {
    const mentors = await MentorApi.POST<IMentors>('getFiltered',
      {
        filters: { ...allFilters.filters },
        pagination: { ...allFilters.pagination }
      });
    return mentors;
  }
)