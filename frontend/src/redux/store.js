import {configureStore} from "@reduxjs/toolkit";
import newsSlice from "./slices/newsSlice";
import commentsSlice from "./slices/commentsSlice";

export const store = configureStore({
  reducer: {
    news: newsSlice,
    comments: commentsSlice,
  },
});