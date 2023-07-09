import { createSlice } from '@reduxjs/toolkit';
import { CommentModel } from 'models/commentModel';
import { commentThunk } from 'redux/thunks/comment';

interface CommentState {
  commentList: CommentModel[];
}

const initialState = {
  commentList: [],
} as CommentState;

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAll
      .addCase(commentThunk.getAll.fulfilled, (state, { payload: newCommentList }) => {
        state.commentList = newCommentList;
      });
  },
});

// export const {} = commentSlice.actions;

export default commentSlice.reducer;
