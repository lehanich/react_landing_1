import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMentorPage } from '../../../interfaces/IMentorPage'

import { MentorPageApi } from './MentorApi';

export const getMentorById = createAsyncThunk (
    'user/getById',
    async (id: number) => {
        const tag = await MentorPageApi.POST<IMentorPage>('getById', {id });

        return tag;
    }
)