import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "protein",
  initialState,
  reducers: {
    incrementProtein: (state, action) => {
      state.value += action.payload;
    },
    decrementProtein: (state, action) => {
      state.value -= action.payload;
    },
    setProtein: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementProtein, decrementProtein, setProtein } =
  counterSlice.actions;

export default counterSlice.reducer;
