import { ProjectCategoryModel } from './optionsModel';
import { TaskDeTailModel } from './taskModel';

// createProjectAuthorize
export type ProjectInsertModel = {
  projectName: string;
  description: string;
  categoryId: number;
  alias: string;
};

// getProjectDetail
export type ProjectDetailModel = {
  lstTask: LstTaskModel[];
  members: MemberDetailModel[];
  creator: CreatorModel;
  id: number;
  projectName: string;
  description: string;
  projectCategory: ProjectCategoryModel;
  alias: string;
};

export type LstTaskModel = {
  lstTaskDeTail: TaskDeTailModel[];
  statusId: string;
  statusName: string;
  alias: string;
};

export type MemberDetailModel = MemberModel & { [index: string]: any; email: null; phoneNumber: null };

// getAllProject
export type ProjectModel = {
  members: MemberModel[];
  creator: CreatorModel;
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
};

export type CreatorModel = {
  id: number;
  name: string;
};

export type MemberModel = {
  userId: number;
  name: string;
  avatar: string;
};

// updateProject
export type ProjectUpdateModel = {
  id: number;
  projectName: string;
  creator: number;
  description: string;
  categoryId: string;
};

// assignUserProject
// removeUserFromProject
export type UserProjectModel = {
  projectId: number;
  userId: number;
};
