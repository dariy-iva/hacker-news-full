import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../utils/api";

export const getNewsList = createAsyncThunk("news/getNewsList", () => {
  return api.getNewsList()
    .then((list) => list)
    .catch((err) => console.log(err));
});

const initialState = {
  news: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNews(state) {
      state.news = [];
    },
  },
  extraReducers: {
    [getNewsList.fulfilled]: (state, action) => {
      state.news = [...action.payload];
    },
  },
});

export const {clearNews} = newsSlice.actions;
export default newsSlice.reducer;