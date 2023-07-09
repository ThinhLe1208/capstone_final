import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { CommentModel, CommentModelInsertModel } from 'models/commentModel';
import { AppDispatch, RootState } from 'redux/configureStore';
import { commentService } from 'services/commentService';

class CommentThunk {
  getAll = createAsyncThunk<CommentModel[], number | undefined>('comment/getAllAPI', async (taskId) => {
    const response = await commentService.getAll(taskId);
    return response?.data?.content;
  });

  insertComment = createAsyncThunk<
    string,
    CommentModelInsertModel,
    {
      dispatch: AppDispatch;
      rejectValue: string;
    }
  >('comment/insertCommentAPI', async (insertComment, { dispatch, rejectWithValue }) => {
    try {
      const response = await commentService.insertComment(insertComment);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        return err;
      }
    } finally {
      dispatch(this.getAll(insertComment?.taskId));
    }
  });

  updateComment = createAsyncThunk<
    string,
    { id: number; contentComment: string },
    {
      state: RootState;
      dispatch: AppDispatch;
      rejectValue: string;
    }
  >('comment/updateCommentAPI', async (updateComment, { dispatch, rejectWithValue, getState }) => {
    try {
      const response = await commentService.updateComment(updateComment);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        return err;
      }
    } finally {
      const { taskDetail } = getState().task;
      if (taskDetail?.taskId) {
        dispatch(this.getAll(taskDetail?.taskId));
      }
    }
  });

  deleteComment = createAsyncThunk<
    string,
    number,
    {
      state: RootState;
      dispatch: AppDispatch;
      rejectValue: string;
    }
  >('comment/deleteCommentAPI', async (idComment, { dispatch, rejectWithValue, getState }) => {
    try {
      const response = await commentService.deleteComment(idComment);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        return err;
      }
    } finally {
      const { taskDetail } = getState().task;
      if (taskDetail?.taskId) {
        dispatch(this.getAll(taskDetail?.taskId));
      }
    }
  });
}

export const commentThunk = new CommentThunk();
