import { createSlice } from '@reduxjs/toolkit';
import { ITag } from '../../interfaces/ITag';
import { getAllTags } from './thunks/getAllTags';
import { getTagById } from './thunks/getTagById';

export type TagState = {
  tags: {
    entities: ITag[];
    isLoading: boolean;
    error: string | undefined;
  };
};

const initialState: TagState = {
  tags: {
    entities: [],
    isLoading: false,
    error: undefined,
  },
};

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(getAllTags.pending, (state) => {
      state.tags.isLoading = true;
    });

    builder.addCase(getAllTags.fulfilled, (state, action) => {
      state.tags.isLoading = false;
      state.tags.entities = action.payload;
    });

    builder.addCase(getAllTags.rejected, (state, action) => {
      state.tags.isLoading = false;
      state.tags.error = action.error.message;
    });

    builder.addCase(getTagById.fulfilled, (state, action) => {
      console.log(action.payload);
    })
  },
});

export default tagSlice.reducer;
