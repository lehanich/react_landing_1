import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMentor } from '../../../interfaces/IMentor';

import { MentorPageApi } from './MentorApi';

export const getMentorById = createAsyncThunk (
  'user/getById',
  async (id: number) => {
    const tag = await MentorPageApi.POST<{ user: IMentor }>('getById', { id });

		return tag;
  }
)