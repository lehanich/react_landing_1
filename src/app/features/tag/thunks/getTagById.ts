import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITag } from '../../../interfaces/ITag'

import { TagApi } from './TagApi';

export const getTagById = createAsyncThunk (
    'tag/getTagById',
    async (id: number) => {
        const tag = await TagApi.POST<ITag>('getById', {id });

        return tag;
    }
)