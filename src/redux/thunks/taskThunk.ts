import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  TaskDeTailModel,
  TaskEditModel,
  TaskEditResponseModel,
  TaskInsertModel,
  TimeTrackingUpdateModel,
  UpdateEstimateModel,
  UpdatePiorityModel,
  UpdateStatusVM,
} from 'models/taskModel';
import { AppDispatch, RootState } from 'redux/configureStore';
import taskService from 'services/taskService';
import { projectThunk } from './projectThunk';

class TaskThunk {
  createTask = createAsyncThunk<
    string,
    TaskInsertModel,
    {
      dispatch: AppDispatch;
      rejectValue: string;
      state: RootState;
    }
  >('task/createTaskAPI', async (newTask, { dispatch, rejectWithValue, getState }) => {
    try {
      const response = await taskService.createTask(newTask);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        return err;
      }
    } finally {
      const { projectDetail } = getState().project;
      if (projectDetail?.id) {
        dispatch(projectThunk.getProjectDetail(projectDetail.id));
      }
    }
  });

  updateStatus = createAsyncThunk<
    string,
    UpdateStatusVM,
    {
      dispatch: AppDispatch;
      rejectValue: string;
      state: RootState;
    }
  >('task/updateStatusAPI', async (updateStatus, { dispatch, rejectWithValue, getState }) => {
    try {
      const response = await taskService.updateStatus(updateStatus);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        return err;
      }
    } finally {
      dispatch(this.getTaskDetail(updateStatus?.taskId));
      const { projectDetail } = getState().project;
      if (projectDetail?.id) {
        dispatch(projectThunk.getProjectDetail(projectDetail.id));
      }
    }
  });

  updatePriority = createAsyncThunk<
    string,
    UpdatePiorityModel,
    {
      dispatch: AppDispatch;
      rejectValue: string;
      state: RootState;
    }
  >('task/updatePriorityAPI', async (updatePriority, { dispatch, rejectWithValue, getState }) => {
    try {
      const response = await taskService.updatePriority(updatePriority);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        return err;
      }
    } finally {
      dispatch(this.getTaskDetail(updatePriority?.taskId));
      const { projectDetail } = getState().project;
      if (projectDetail?.id) {
        dispatch(projectThunk.getProjectDetail(projectDetail.id));
      }
    }
  });

  updateTimeTracking = createAsyncThunk<
    string,
    TimeTrackingUpdateModel,
    {
      dispatch: AppDispatch;
      rejectValue: string;
      state: RootState;
    }
  >('task/updateTimeTrackingAPI', async (updateTimeTracking, { dispatch, rejectWithValue, getState }) => {
    try {
      const response = await taskService.updateTimeTracking(updateTimeTracking);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        return err;
      }
    } finally {
      dispatch(this.getTaskDetail(updateTimeTracking?.taskId));
      const { projectDetail } = getState().project;
      if (projectDetail?.id) {
        dispatch(projectThunk.getProjectDetail(projectDetail.id));
      }
    }
  });

  updateEstimate = createAsyncThunk<
    string,
    UpdateEstimateModel,
    {
      dispatch: AppDispatch;
      rejectValue: string;
      state: RootState;
    }
  >('task/updateEstimateAPI', async (updateEstimate, { dispatch, rejectWithValue, getState }) => {
    try {
      const response = await taskService.updateEstimate(updateEstimate);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        return err;
      }
    } finally {
      dispatch(this.getTaskDetail(updateEstimate?.taskId));
      const { projectDetail } = getState().project;
      if (projectDetail?.id) {
        dispatch(projectThunk.getProjectDetail(projectDetail.id));
      }
    }
  });

  updateTask = createAsyncThunk<
    TaskEditResponseModel,
    TaskEditModel,
    {
      dispatch: AppDispatch;
      state: RootState;
      rejectValue: string;
    }
  >('task/updateTaskAPI', async (updateTask, { rejectWithValue, dispatch }) => {
    try {
      const response = await taskService.updateTask(updateTask);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        return err;
      }
    } finally {
      dispatch(this.getTaskDetail(Number(updateTask.taskId)));
      dispatch(projectThunk.getProjectDetail(updateTask.projectId));
    }
  });

  removeTask = createAsyncThunk<
    string,
    number,
    {
      dispatch: AppDispatch;
      state: RootState;
      rejectValue: string;
    }
  >('task/removeTaskAPI', async (taskId, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await taskService.removeTask(taskId);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        return err;
      }
    } finally {
      const { projectDetail } = getState().project;
      if (projectDetail?.id) {
        dispatch(projectThunk.getProjectDetail(projectDetail.id));
      }
    }
  });

  getTaskDetail = createAsyncThunk<
    TaskDeTailModel,
    number,
    {
      rejectValue: string;
    }
  >('task/getTaskDetailAPI', async (taskId, { rejectWithValue }) => {
    try {
      const response = await taskService.getTaskDetail(taskId);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        return err;
      }
    }
  });
}

const taskThunk = new TaskThunk();
export default taskThunk;
