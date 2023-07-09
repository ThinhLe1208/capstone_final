import { createAsyncThunk } from '@reduxjs/toolkit';

import { PriorityModel, ProjectCategoryModel, StatusModel, TaskTypeModel } from 'models/optionsModel';
import { optionsService } from 'services/optionsService';

class OptionsThunk {
  getPriority = createAsyncThunk('options/getPriorityAPI', async (id: number | undefined) => {
    const response = await optionsService.getPriority(id);
    return response?.data?.content as PriorityModel[];
  });

  getAllProjectCategory = createAsyncThunk('options/getAllProjectCategoryAPI', async () => {
    const response = await optionsService.getAllProjectCategory();
    return response?.data?.content as ProjectCategoryModel[];
  });

  getAllStatus = createAsyncThunk('options/getAllStatusAPI', async () => {
    const response = await optionsService.getAllStatus();
    return response?.data?.content as StatusModel[];
  });

  getAllTaskType = createAsyncThunk('options/getAllTaskTypeAPI', async () => {
    const response = await optionsService.getAllTaskType();
    return response?.data?.content as TaskTypeModel[];
  });
}

export const optionsThunk = new OptionsThunk();
