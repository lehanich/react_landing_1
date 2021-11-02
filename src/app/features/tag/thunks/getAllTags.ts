import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITag } from '../../../interfaces/ITag';
import { TagApi } from './TagApi';

export const getAllTags = createAsyncThunk(
  'tag/getAllTags',
  async () => {
    const tags = await TagApi.POST<ITag[]>('getAll');//('getAll');

    return tags;
    // return [];
  }
);
