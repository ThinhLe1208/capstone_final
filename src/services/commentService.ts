import { CommentModelInsertModel } from 'models/commentModel';
import { https } from './baseService';

class CommentService {
  getAll = (taskId: number | undefined) => {
    let url = '/api/Comment/getAll';
    if (taskId) {
      url = `/api/Comment/getAll?taskId=${taskId}`;
    }
    return https.get(url);
  };

  insertComment = (insertComment: CommentModelInsertModel) => {
    let url = '/api/Comment/insertComment';
    return https.post(url, insertComment);
  };

  updateComment = (updateComment: { id: number; contentComment: string }) => {
    let url = '/api/Comment/updateComment';
    if (updateComment?.id && updateComment?.contentComment) {
      url = `/api/Comment/updateComment?id=${updateComment?.id}&contentComment=${updateComment?.contentComment}`;
    }
    return https.put(url);
  };

  deleteComment = (idComment: number) => {
    let url = '/api/Comment/deleteComment';
    if (idComment) {
      url = `/api/Comment/deleteComment?idComment=${idComment}`;
    }
    return https.delete(url);
  };
}

export const commentService = new CommentService();
