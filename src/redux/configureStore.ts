import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import optionsReducer from './slices/optionsSlice';
import projectReducer from './slices/projectSlice';
import taskReducer from './slices/taskSlice';
import uiControlReducer from './slices/uiControlSlice';
import usersReducer from './slices/usersSlice';
import commentReducer from './slices/commentSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    uiControl: uiControlReducer,
    options: optionsReducer,
    project: projectReducer,
    task: taskReducer,
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
