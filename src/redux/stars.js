import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 50,
};

export const counterSlice = createSlice({
  name: "stars",
  initialState,
  reducers: {
    decrementStars: (state, action) => {
      state.value -= action.payload;
    },
    incrementStars: (state, action) => {
      state.value += action.payload;
    },
    setStars: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { decrementStars, incrementStars, setStars } =
  counterSlice.actions;

export default counterSlice.reducer;
