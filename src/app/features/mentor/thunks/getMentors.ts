import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMentors } from '../../../interfaces/IMentors';
import { MentorApi } from './MentorApi';

// import * as fs from 'fs';

export const getMentors = createAsyncThunk (
  'mentor/getFiltered',
  async (allFilters?: any) => {
    const mentors = await MentorApi.POST<IMentors>('getFiltered',
      {
        filters: { ...allFilters.filters },
        pagination: { ...allFilters.pagination }
      });
      console.log(mentors)
      
      var data = new FormData();
      data.append('../../../data/mentors.json', JSON.stringify(mentors));
      // data.append("data" , JSON.stringify(mentors));
      // console.log(data)
      // var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      // xhr.open( 'post', '../../../data/mentors.json', true );
      // xhr.send(data);
      // const fs = require('fs');
      // // fs.appendFileSync('../../../data/mentors.json', JSON.stringify(mentors));
      // fs.writeFile('log.txt', '../../../data/mentors.json',  JSON.stringify(mentors),  function(err:any) {
      //   if (err) {
      //       return console.error(err);
      //   }
      // });
    return mentors;
  }
)