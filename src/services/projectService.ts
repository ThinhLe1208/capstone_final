import { ProjectInsertModel, ProjectUpdateModel, UserProjectModel } from 'models/projectModel';
import { https } from './baseService';

class ProjectService {
  createProjectAuthorize = (projectInsert: ProjectInsertModel) => {
    let url = '/api/Project/createProjectAuthorize';
    return https.post(url, projectInsert);
  };

  getProjectDetail = (id: number) => {
    let url = '/api/Project/getProjectDetail';
    if (id) {
      url = `/api/Project/getProjectDetail?id=${id}`;
    }
    return https.get(url);
  };

  getAllProject = (keyword: string | undefined) => {
    let url = '/api/Project/getAllProject';
    if (keyword) {
      url = `/api/Project/getAllProject?keyword=${keyword}`;
    }
    return https.get(url);
  };

  deleteProject = (projectId: number | undefined) => {
    let url = '/api/Project/deleteProject';
    if (projectId) {
      url = `/api/Project/deleteProject?projectId=${projectId}`;
    }
    return https.delete(url);
  };

  updateProject = (projectUpdate: ProjectUpdateModel) => {
    let url = `/api/Project/updateProject?projectId=${projectUpdate.id}`;
    return https.put(url, projectUpdate);
  };

  assignUserProject = (project: UserProjectModel) => {
    let url = '/api/Project/assignUserProject';
    return https.post(url, project);
  };

  removeUserFromProject = (project: UserProjectModel) => {
    let url = '/api/Project/removeUserFromProject';
    return https.post(url, project);
  };
}

export const projectService = new ProjectService();
