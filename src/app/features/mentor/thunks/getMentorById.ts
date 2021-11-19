import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMentor } from '../../../interfaces/IMentor';

import { MentorPageApi } from './MentorApi';

export const getMentorById = createAsyncThunk (
  'user/getById',
  async (id: number) => {
    // const tag = await MentorPageApi.POST<{ user: IMentor }>('getById', { id });

    const res = await fetch('/data/478.json');
    if(res.status !== 200){
      throw new Error("Error with status " + res.status);
    }
    const tag = await res.json();

    return tag;
  }
);