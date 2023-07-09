import { Editor } from '@tinymce/tinymce-react';
import { Avatar, Button, Col, Divider, Input, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Card from 'components/Card';
import { CommentModel } from 'models/commentModel';
import { TaskDeTailModel } from 'models/taskModel';
import { RootState, useAppDispatch } from 'redux/configureStore';
import { commentThunk } from 'redux/thunks/comment';
import { TINY_KEY } from 'utils/constants';
import Comment from '../Comment';
import styles from './styles.module.scss';

interface Props {
  taskDetail: TaskDeTailModel | undefined | null;
}

const CommentBoard = ({ taskDetail }: Props) => {
  const dispatch = useAppDispatch();
  const { userLogin } = useSelector((state: RootState) => state.users);
  const { commentList } = useSelector((state: RootState) => state.comment);
  const [isComment, setIsComment] = useState(false);
  const [contentComment, setContentComment] = useState('');

  useEffect(() => {
    dispatch(commentThunk.getAll(taskDetail?.taskId));
  }, [dispatch, taskDetail]);

  const handleSendComment = async () => {
    if (contentComment.trim().length !== 0 && taskDetail) {
      try {
        const insertComment = {
          taskId: taskDetail?.taskId,
          contentComment: contentComment,
        };
        await dispatch(commentThunk.insertComment(insertComment)).unwrap();
        setIsComment(false);
        setContentComment('');
        toast.success('Send a comment successfully.');
      } catch (err) {
        toast.error('Failed to send a comment.');
      }
    }
  };

  const renderCommentMessages = (list: CommentModel[]) => {
    if (Array.isArray(list)) {
      return list.map((comment, index) => (
        <Comment
          key={index}
          comment={comment}
        />
      ));
    }
  };

  return (
    <Card className={styles.commentBoardWrapper}>
      <p className={styles.label}>Comments</p>

      <Row style={{ marginBottom: '20px' }}>
        <Col
          span={2}
          className={styles.leftSide}
        >
          <Avatar src={userLogin?.avatar} />
        </Col>
        <Col
          span={22}
          className={styles.rightSide}
        >
          {!isComment && (
            <Input
              value={contentComment}
              placeholder='Add a comment...'
              onClick={() => setIsComment(true)}
            />
          )}
          {isComment && (
            <>
              <Editor
                apiKey={TINY_KEY}
                value={contentComment}
                onEditorChange={(value) => {
                  setContentComment(value);
                }}
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'code',
                    'help',
                    'wordcount',
                  ],
                  toolbar:
                    'blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family: Inter,Helvetica,Arial,sans-serif ; font-size:14px }',
                }}
              />
              <Space className={styles.commentBtns}>
                <Button
                  type='primary'
                  size='small'
                  onClick={handleSendComment}
                >
                  Send
                </Button>
                <Button
                  type='text'
                  size='small'
                  onClick={() => {
                    setIsComment(false);
                    setContentComment('');
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </>
          )}
        </Col>
      </Row>

      <Divider />

      {/* comment list */}
      <div className={styles.commentList}>{renderCommentMessages(commentList)}</div>
    </Card>
  );
};

export default CommentBoard;
