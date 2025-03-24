import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/MovieSlice.jsx";
import tvReducer from "./reducers/TvSlice.jsx";
import personReducer from "./reducers/PersonSlice.jsx";
export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
  },
});
