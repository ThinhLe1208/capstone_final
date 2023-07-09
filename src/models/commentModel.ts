// getAll
export type CommentModel = {
  user: CommnentUserModel;
  id: number;
  userId: number;
  taskId: number;
  contentComment: string;
  deleted: boolean;
  alias: string;
};

export type CommnentUserModel = {
  userId: number;
  name: string;
  avatar: string;
};

// insertComment
export type CommentModelInsertModel = {
  taskId: number;
  contentComment: string;
};
