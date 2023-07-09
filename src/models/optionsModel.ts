// getPriority
export type PriorityModel = {
  [index: string]: string | number | boolean;
  priorityId: number;
  priority: string;
  description: string;
  deleted: boolean;
  alias: string;
};

// getAllProjectCategory
export type ProjectCategoryModel = {
  [index: string]: string | number;
  id: number;
  projectCategoryName: string;
};

// getAllStatus
export type StatusModel = {
  [index: string]: string;
  statusId: string;
  statusName: string;
  alias: string;
  deleted: string;
};

// getAllTaskType
export type TaskTypeModel = {
  [index: string]: string | number;
  id: number;
  taskType: string;
};
