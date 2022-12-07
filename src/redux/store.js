import { configureStore } from "@reduxjs/toolkit";
import caloriesReducer from "./calories";
import userReducer from "./user";
import ratingReducer from "./rating";
import starsReducer from "./stars";
import foods from "./foods";
import protein from "./protein";
import carbs from "./carbs";
import fat from "./fat";

export default configureStore({
  reducer: {
    calories: caloriesReducer,
    protein: protein,
    carbs: carbs,
    fat: fat,
    user: userReducer,
    rating: ratingReducer,
    stars: starsReducer,
    foods: foods,
  },
});
