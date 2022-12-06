import { configureStore } from "@reduxjs/toolkit";
import caloriesReducer from "./calories";
import userReducer from "./user";
import ratingReducer from "./rating";
import starsReducer from "./stars";
import foods from "./foods";

export default configureStore({
  reducer: {
    calories: caloriesReducer,
    user: userReducer,
    rating: ratingReducer,
    stars: starsReducer,
    foods: foods,
  },
});
