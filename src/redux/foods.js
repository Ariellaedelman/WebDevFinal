import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const counterSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    addFood: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    deleteFood: (state, action) => {
      state.value.filter((food) => food.id !== action.payload.id);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFood, deleteFood } = counterSlice.actions;

export default counterSlice.reducer;
