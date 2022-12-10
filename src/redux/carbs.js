import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "carbs",
  initialState,
  reducers: {
    incrementCarbs: (state, action) => {
      state.value += action.payload;
    },
    decrementCarbs: (state, action) => {
      state.value -= action.payload;
    },
    setCarbs: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementCarbs, decrementCarbs, setCarbs } =
  counterSlice.actions;

export default counterSlice.reducer;
