import { createAsyncThunk } from '@reduxjs/toolkit';
// import { IMentor } from '../../../interfaces/IMentor';
import { IMentorFilters } from '../../../interfaces/IMentorFilters';
// import { MentorApi } from './MentorApi';

// import * as fs from 'fs';

export const getMentors = createAsyncThunk (
  'mentor/getFiltered',
  async (allFilters?: IMentorFilters) => {
    // const mentors = await MentorApi.POST<{ mentors: IMentor[], totalMentorsCount: number}>('getFiltered',
    //   {
    //     ...allFilters
    //   });
    console.log(allFilters);
    const res = await fetch('/data/mentors.json');
    if(res.status !== 200){
      throw new Error("Error with status " + res.status);
    }
    const mentors = await res.json();

    return mentors;
  }
);
