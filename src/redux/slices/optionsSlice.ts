import { createSlice } from '@reduxjs/toolkit';

import { PriorityModel, ProjectCategoryModel, StatusModel, TaskTypeModel } from 'models/optionsModel';
import { optionsThunk } from 'redux/thunks/optionsThunk';

export interface OptionsState {
  priorityList: PriorityModel[];
  projectCategoryList: ProjectCategoryModel[];
  statusList: StatusModel[];
  taskTypeList: TaskTypeModel[];
}

const initialState = {
  priorityList: [],
  projectCategoryList: [],
  statusList: [],
  taskTypeList: [],
} as OptionsState;

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getPriority
      .addCase(optionsThunk.getPriority.fulfilled, (state, { payload: newPriorityList }) => {
        state.priorityList = newPriorityList;
      })
      // getAllProjectCategory
      .addCase(optionsThunk.getAllProjectCategory.fulfilled, (state, { payload: newProjectCategoryList }) => {
        state.projectCategoryList = newProjectCategoryList;
      })
      // getAllStatus
      .addCase(optionsThunk.getAllStatus.fulfilled, (state, { payload: newStatusList }) => {
        state.statusList = newStatusList;
      })
      // getAllTaskType
      .addCase(optionsThunk.getAllTaskType.fulfilled, (state, { payload: newTaskTypeList }) => {
        state.taskTypeList = newTaskTypeList;
      });
  },
});

// export const {} = optionsSlice.actions;

export default optionsSlice.reducer;
