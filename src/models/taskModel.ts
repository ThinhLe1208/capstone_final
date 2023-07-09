import { PriorityModel, TaskTypeModel } from './optionsModel';

// assignUserTask
export type TaskUser = {
  taskId: number;
  userId: number;
};

// updateStatus
export type UpdateStatusVM = {
  taskId: number;
  statusId: string;
};

// updatePriority
export type UpdatePiorityModel = {
  taskId: number;
  priorityId: number;
};

// updateTimeTracking
export type TimeTrackingUpdateModel = {
  taskId: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
};

// updateEstimate
export type UpdateEstimateModel = {
  taskId: number;
  originalEstimate: number;
};

// createTask
export type TaskInsertModel = {
  listUserAsign: number[];
  taskName: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  priorityId: number;
};

// updateTask
export type TaskEditModel = {
  listUserAsign: number[];
  taskId: string;
  taskName: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  priorityId: number;
};

export type TaskEditResponseModel = Omit<TaskEditModel, 'listUserAsign'> & {
  taskId: number;
  alias: string;
  deleted: boolean;
  reporterId: number;
};

// getTaskDetail
export type TaskDeTailModel = {
  priorityTask: Pick<PriorityModel, 'priorityId' | 'priority'>;
  taskTypeDetail: TaskTypeModel;
  assigness: AssignessModel[];
  lstComment: LstComment[];
  taskId: number;
  taskName: string;
  alias: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  typeId: number;
  priorityId: number;
  projectId: number;
};

export type AssignessModel = {
  id: number;
  avatar: string;
  name: string;
  alias: string;
};

export type LstComment = {
  id: number;
  idUser: number;
  name: string;
  avatar: string;
  commentContent: string;
};
