import {
  TaskEditModel,
  TaskInsertModel,
  TimeTrackingUpdateModel,
  UpdateEstimateModel,
  UpdatePiorityModel,
  UpdateStatusVM,
} from 'models/taskModel';
import { https } from './baseService';

class TaskService {
  createTask = (newTask: TaskInsertModel) => {
    let url = '/api/Project/createTask';
    return https.post(url, newTask);
  };

  updateStatus = (updateStatus: UpdateStatusVM) => {
    let url = '/api/Project/updateStatus';
    return https.put(url, updateStatus);
  };

  updatePriority = (updatePriority: UpdatePiorityModel) => {
    let url = '/api/Project/updatePriority';
    return https.put(url, updatePriority);
  };

  updateTimeTracking = (updateTimeTracking: TimeTrackingUpdateModel) => {
    let url = '/api/Project/updateTimeTracking';
    return https.put(url, updateTimeTracking);
  };

  updateEstimate = (updateEstimate: UpdateEstimateModel) => {
    let url = '/api/Project/updateEstimate';
    return https.put(url, updateEstimate);
  };

  updateTask = (updateTask: TaskEditModel) => {
    let url = '/api/Project/updateTask';
    return https.post(url, updateTask);
  };

  removeTask = (taskId: number) => {
    let url = `/api/Project/removeTask?taskId=${taskId}`;
    return https.delete(url);
  };

  getTaskDetail = (taskId: number) => {
    let url = `/api/Project/getTaskDetail?taskId=${taskId}`;
    return https.get(url);
  };
}

const taskService = new TaskService();
export default taskService;
