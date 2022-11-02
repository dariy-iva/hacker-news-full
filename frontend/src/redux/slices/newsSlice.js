import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../utils/api";

export const getNewsList = createAsyncThunk("news/getNewsList", () => {
  return api.getNewsList()
    .then((list) => list)
    .catch((err) => console.log(err));
});

const initialState = {
  news: [],
  currentNew: {}
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setCurrentNew(state, action) {
      state.currentNew = action.payload;
    },
    clearNews(state) {
      state.news = [];
    },
    clearCurrentNew(state) {
      state.currentNew = {};
    },
  },
  extraReducers: {
    [getNewsList.fulfilled]: (state, action) => {
      state.news = [...action.payload];
    },
  },
});

export const {setCurrentNew, clearCurrentNew, clearNews} = newsSlice.actions;
export default newsSlice.reducer;