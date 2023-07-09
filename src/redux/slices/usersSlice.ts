import { createSlice } from '@reduxjs/toolkit';

import { User, UserJiraModelUpdateModel, UserLoginModel } from 'models/usersModel';
import { usersThunk } from 'redux/thunks/usersThunk';
import { USER_LOGIN } from 'utils/constants';
import storage from 'utils/storage';

export interface UsersState {
  userLogin: UserLoginModel | undefined;
  getUserList: User[];
  userEdit: UserJiraModelUpdateModel | undefined;
  //   getUserByProjectId: [];
}

const initialState = {
  userLogin: storage.getStorageJson(USER_LOGIN),
  getUserList: [],
  userEdit: undefined,
  //   getUserByProjectId: [],
} as UsersState;

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserEdit: (state, { payload: newUserEdit }) => {
      state.userEdit = newUserEdit;
    },
  },
  extraReducers: (builder) => {
    builder
      // signIn
      .addCase(usersThunk.signIn.fulfilled, (state, { payload: newUserLogin }) => {
        state.userLogin = newUserLogin;
      })
      // getUser
      .addCase(usersThunk.getuser.fulfilled, (state, { payload: newGetUserList }) => {
        state.getUserList = newGetUserList;
      });
  },
});

export const { setUserEdit } = usersSlice.actions;

export default usersSlice.reducer;
