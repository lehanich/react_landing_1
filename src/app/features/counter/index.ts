import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CounterState = {
  value: number;
}

const initialState: CounterState = {
  value: 1
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },

    setValue(state, action: PayloadAction<number>) {
      state.value = action.payload;
    }
  }
});

export const { increment, setValue } = counterSlice.actions;
export default counterSlice.reducer;
