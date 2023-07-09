import { createSlice } from '@reduxjs/toolkit';
import { TaskDeTailModel } from 'models/taskModel';
import taskThunk from 'redux/thunks/taskThunk';

interface taskState {
  taskDetail: TaskDeTailModel | null | undefined;
}

const initialState = {
  taskDetail: null,
} as taskState;

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getTaskDetail
      .addCase(taskThunk.getTaskDetail.fulfilled, (state, { payload: newTaskDetail }) => {
        state.taskDetail = newTaskDetail;
      });
  },
});

// export const {} = taskSlice.actions;

export default taskSlice.reducer;
