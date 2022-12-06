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
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = counterSlice.actions;

export default counterSlice.reducer;
