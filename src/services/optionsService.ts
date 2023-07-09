import { https } from './baseService';

class OptionsService {
  getPriority = (id: number | undefined) => {
    let url = '/api/Priority/getAll?id=0';
    if (id) {
      url = `/api/Priority/getAll?id=${id}`;
    }
    return https.get(url);
  };

  getAllProjectCategory = () => {
    let url = '/api/ProjectCategory';
    return https.get(url);
  };

  getAllStatus = () => {
    let url = '/api/Status/getAll';
    return https.get(url);
  };

  getAllTaskType = () => {
    let url = '/api/TaskType/getAll';
    return https.get(url);
  };
}

export const optionsService = new OptionsService();
