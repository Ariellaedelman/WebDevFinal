import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "calories",
  initialState,
  reducers: {
    incrementCalories: (state, action) => {
      state.value += action.payload;
    },
    decrementCalories: (state, action) => {
      state.value -= action.payload;
    },
    setCalories: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementCalories, decrementCalories, setCalories } =
  counterSlice.actions;

export default counterSlice.reducer;
