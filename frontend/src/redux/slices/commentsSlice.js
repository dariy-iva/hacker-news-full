import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../utils/api";

export const getCommentsList = createAsyncThunk("comments/getCommentsList", (parentId) => {
  return api
    .getCommentsList(parentId)
    .then((list) => list)
    .catch((err) => console.log(err));
});

const initialState = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearCommentById(state, action) {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
    clearComments(state) {
      state.comments = [];
    },
  },
  extraReducers: {
    [getCommentsList.fulfilled]: (state, action) => {
      state.comments = [...state.comments, ...action.payload];
    },
  },
});

export const {clearComments, clearCommentById} = commentsSlice.actions;
export default commentsSlice.reducer;
