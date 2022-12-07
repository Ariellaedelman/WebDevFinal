import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "fat",
  initialState,
  reducers: {
    incrementFat: (state, action) => {
      state.value += action.payload;
    },
    decrementFat: (state, action) => {
      state.value -= action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementFat, decrementFat } = counterSlice.actions;

export default counterSlice.reducer;
