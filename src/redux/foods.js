import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const counterSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    addGlobalFood: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    deleteGlobalFood: (state, action) => {
      state.value = state.value.filter(
        (food) => food.item_id !== action.payload.item_id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addGlobalFood, deleteGlobalFood } = counterSlice.actions;

export default counterSlice.reducer;
