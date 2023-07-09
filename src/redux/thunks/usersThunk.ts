import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { User, UserJiraLoginModel, UserJiraModel, UserJiraModelUpdateModel, UserLoginModel } from 'models/usersModel';
import { AppDispatch } from 'redux/configureStore';
import { usersService } from 'services/usersService';

class UsersThunk {
  signUp = createAsyncThunk<string, UserJiraModel, { rejectValue: string }>(
    'users/signUpAPI',
    async (signUpFormValues, { rejectWithValue }) => {
      try {
        const response = await usersService.signUp(signUpFormValues);
        return response?.data?.content;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          return rejectWithValue(err.response?.data?.message);
        } else {
          console.error(err);
        }
      }
    }
  );

  signIn = createAsyncThunk<UserLoginModel, UserJiraLoginModel, { rejectValue: string }>(
    'users/signInAPI',
    async (signInFormValues, { rejectWithValue }) => {
      try {
        const response = await usersService.signIn(signInFormValues);
        return response?.data?.content;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          return rejectWithValue(err.response?.data?.message);
        } else {
          console.error(err);
        }
      }
    }
  );

  getuser = createAsyncThunk('users/getuserAPI', async (keyword: string | undefined) => {
    const response = await usersService.getuser(keyword);
    return response?.data?.content as User[];
    // let interceptors.response handles an error
  });

  editUser = createAsyncThunk<
    string,
    UserJiraModelUpdateModel,
    {
      rejectValue: string;
      dispatch: AppDispatch;
    }
  >('users/editUserAPI', async (editUser, { rejectWithValue, dispatch }) => {
    try {
      const response = await usersService.editUser(editUser);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message);
      } else {
        console.error(err);
      }
    } finally {
      dispatch(this.getuser());
    }
  });

  deleteUser = createAsyncThunk<
    string,
    number,
    {
      rejectValue: string;
      dispatch: AppDispatch;
    }
  >('users/deleteUserAPI', async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await usersService.deleteUser(id);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        console.error(err);
      }
    } finally {
      dispatch(this.getuser());
    }
  });
}

export const usersThunk = new UsersThunk();
