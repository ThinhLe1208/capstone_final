import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  ProjectDetailModel,
  ProjectInsertModel,
  ProjectModel,
  ProjectUpdateModel,
  UserProjectModel,
} from 'models/projectModel';
import { AppDispatch } from 'redux/configureStore';
import { projectService } from 'services/projectService';

class ProjectThunk {
  createProjectAuthorize = createAsyncThunk<
    Omit<ProjectModel, 'members'>,
    ProjectInsertModel,
    {
      rejectValue: string;
    }
  >('project/createProjectAuthorizeAPI', async (projectInsert, { rejectWithValue }) => {
    try {
      const response = await projectService.createProjectAuthorize(projectInsert);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        console.error(err);
      }
    }
  });

  getProjectDetail = createAsyncThunk<
    ProjectDetailModel,
    number,
    {
      rejectValue: string;
    }
  >('project/getProjectDetailAPI', async (id, { rejectWithValue }) => {
    try {
      const response = await projectService.getProjectDetail(id);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        console.error(err);
      }
    }
  });

  getAllProject = createAsyncThunk('project/getAllProjectAPI', async (keyword: string | undefined) => {
    const response = await projectService.getAllProject(keyword);
    return response?.data?.content as ProjectModel[];
    // let interceptors.response handles an error
  });

  deleteProject = createAsyncThunk<
    string[],
    number,
    {
      dispatch: AppDispatch;
      rejectValue: string;
    }
  >('project/deleteProjectAPI', async (projectId, { dispatch, rejectWithValue }) => {
    try {
      const response = await projectService.deleteProject(projectId);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        console.error(err);
      }
    } finally {
      dispatch(this.getAllProject());
    }
  });

  updateProject = createAsyncThunk<
    ProjectUpdateModel & { alias: string; deleted: boolean },
    ProjectUpdateModel,
    {
      dispatch: AppDispatch;
      rejectValue: string;
    }
  >('project/updateProjectAPI', async (projectUpdate, { dispatch, rejectWithValue }) => {
    try {
      const response = await projectService.updateProject(projectUpdate);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        console.error(err);
      }
    } finally {
      dispatch(this.getAllProject());
    }
  });

  assignUserProject = createAsyncThunk<
    string,
    UserProjectModel,
    {
      dispatch: AppDispatch;
      rejectValue: string;
    }
  >('project/assignUserProjectAPI', async (project, { dispatch, rejectWithValue }) => {
    try {
      const response = await projectService.assignUserProject(project);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        console.error(err);
      }
    } finally {
      dispatch(this.getAllProject());
    }
  });

  removeUserFromProject = createAsyncThunk<
    string,
    UserProjectModel,
    {
      dispatch: AppDispatch;
      rejectValue: string;
    }
  >('project/removeUserFromProjectAPI', async (project, { dispatch, rejectWithValue }) => {
    try {
      const response = await projectService.removeUserFromProject(project);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        console.error(err);
      }
    } finally {
      dispatch(this.getAllProject());
    }
  });
}

export const projectThunk = new ProjectThunk();
