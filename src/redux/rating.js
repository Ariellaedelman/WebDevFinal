import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    setRating: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRating } = counterSlice.actions;

export default counterSlice.reducer;
