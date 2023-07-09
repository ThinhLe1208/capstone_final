import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { commentThunk } from 'redux/thunks/comment';
import { projectThunk } from 'redux/thunks/projectThunk';
import taskThunk from 'redux/thunks/taskThunk';
import { usersThunk } from 'redux/thunks/usersThunk';

export interface UiControlState {
  screenWidth: number;
  isLoading: boolean;
  isCollapsed: boolean;
  isOpen: boolean;
  offcanvasId: number | undefined;
}

const initialState = {
  screenWidth: 1920,
  isLoading: false,
  // the left sidebar
  isCollapsed: true,
  // the right offcanvas
  isOpen: false,
  offcanvasId: undefined,
} as UiControlState;

const uiControlSlice = createSlice({
  name: 'uiControl',
  initialState,
  reducers: {
    setScreenWidth: (state, { payload: screenWidth }) => {
      state.screenWidth = screenWidth;
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    // the left sidebar
    setSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    // the right offcanvas
    showOffcanvas: (state) => {
      state.isOpen = true;
    },
    hideOffcanvas: (state) => {
      state.isOpen = false;
    },
    setOffcanvas: (state, { payload: id }: PayloadAction<number>) => {
      state.offcanvasId = id;
    },
  },
  extraReducers: (builder) => {
    builder
      // --------- getProjectDetail ---------
      .addCase(projectThunk.getProjectDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(projectThunk.getProjectDetail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(projectThunk.getProjectDetail.rejected, (state) => {
        state.isLoading = false;
      })
      // createTask + getProjectDetail
      .addCase(taskThunk.createTask.pending, (state) => {
        state.isLoading = true;
      })

      //  --------- getTaskDetail ---------
      .addCase(taskThunk.getTaskDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taskThunk.getTaskDetail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(taskThunk.getTaskDetail.rejected, (state) => {
        state.isLoading = false;
      })
      // updateTask + getProjectDetail + getTaskDetail
      .addCase(taskThunk.updateTask.pending, (state) => {
        state.isLoading = true;
      })

      // --------- getAllProject ---------
      .addCase(projectThunk.getAllProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(projectThunk.getAllProject.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(projectThunk.getAllProject.rejected, (state) => {
        state.isLoading = false;
      })
      // deleteProject + getAllProject
      .addCase(projectThunk.deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      // updateProject + getAllProject
      .addCase(projectThunk.updateProject.pending, (state) => {
        state.isLoading = true;
      })
      // assignUserProject + getAllProject
      .addCase(projectThunk.assignUserProject.pending, (state) => {
        state.isLoading = true;
      })
      // removeUserFromProject + getAllProject
      .addCase(projectThunk.removeUserFromProject.pending, (state) => {
        state.isLoading = true;
      })

      //  --------- getAllComment ---------
      .addCase(commentThunk.getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(commentThunk.getAll.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(commentThunk.getAll.rejected, (state) => {
        state.isLoading = false;
      })
      // insertComment + getAllComment
      .addCase(commentThunk.insertComment.pending, (state) => {
        state.isLoading = true;
      })
      // updateComment + getAllComment
      .addCase(commentThunk.updateComment.pending, (state) => {
        state.isLoading = true;
      })
      // deleteComment + getAllComment
      .addCase(commentThunk.deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      //  --------- getuser ---------
      .addCase(usersThunk.getuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(usersThunk.getuser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(usersThunk.getuser.rejected, (state) => {
        state.isLoading = false;
      })
      // editUser + getuser
      .addCase(usersThunk.editUser.pending, (state) => {
        state.isLoading = true;
      })
      // deleteUser + getuser
      .addCase(usersThunk.deleteUser.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { setScreenWidth, showLoading, hideLoading, setSidebar, showOffcanvas, hideOffcanvas, setOffcanvas } =
  uiControlSlice.actions;

export default uiControlSlice.reducer;
