import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    editUser: (state, action) => {
      state.value = {
        ...state.value,
        calories: action.payload.calories,
        fat: action.payload.fat,
        protein: action.payload.protein,
        carbs: action.payload.carbs,
        macro_plan: action.payload.macro_plan,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, editUser } = counterSlice.actions;

export default counterSlice.reducer;
