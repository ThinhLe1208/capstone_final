import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Editor } from '@tinymce/tinymce-react';
import { Avatar, Button, Col, Popconfirm, Row } from 'antd';
import parse from 'html-react-parser';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import Card from 'components/Card';
import { CommentModel } from 'models/commentModel';
import { useAppDispatch } from 'redux/configureStore';
import { commentThunk } from 'redux/thunks/comment';
import { TINY_KEY } from 'utils/constants';
import styles from './styles.module.scss';

interface Props {
  comment: CommentModel;
}

const Comment = ({ comment }: Props) => {
  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(comment?.contentComment);
  // random comment generation time
  const timeRef = useRef(Math.floor(Math.random() * 24 + 1));

  const handleUpdateComment = async () => {
    if (content.trim().length !== 0) {
      try {
        const updateComment = {
          id: comment?.id,
          contentComment: content,
        };
        await dispatch(commentThunk.updateComment(updateComment)).unwrap();
        setIsEdit(false);
        toast.success('Edit a comment successfully.');
      } catch (err) {
        toast.error('Failed to edit a comment.');
      }
    }
  };

  const handleEditComment = () => {
    setIsEdit(true);
    setContent(comment?.contentComment);
  };

  const handleDeleteComment = async () => {
    try {
      await dispatch(commentThunk.deleteComment(comment?.id)).unwrap();
      setIsEdit(false);
      toast.success('Delete a comment successfully.');
    } catch (err) {
      toast.error('Failed to delete a comment.');
    }
  };

  return (
    <div className={styles.commentWrapper}>
      <Row>
        <Col
          span={2}
          className={styles.leftSide}
        >
          <Avatar src={comment?.user?.avatar} />
        </Col>

        <Col span={22}>
          <div className={styles.rightSide}>
            <p className={styles.useName}>
              {comment?.user?.name}
              <span className={styles.time}>{timeRef.current} hours ago</span>
            </p>

            {isEdit ? (
              <>
                <div style={{ padding: '8px 0', width: '100%' }}>
                  <Editor
                    apiKey={TINY_KEY}
                    value={content}
                    onEditorChange={(value) => {
                      setContent(value);
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
                </div>
                <div className={styles.buttons}>
                  <Button
                    type='primary'
                    size='small'
                    onClick={handleUpdateComment}
                  >
                    Save
                  </Button>
                  <Button
                    type='text'
                    size='small'
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Card className={styles.contentMess}>{parse(comment?.contentComment)}</Card>
                <div className={styles.buttons}>
                  <Button
                    type='text'
                    size='small'
                    onClick={handleEditComment}
                  >
                    <u>Edit</u>
                  </Button>
                  <Popconfirm
                    icon={
                      <FontAwesomeIcon
                        icon={faCircleQuestion}
                        style={{ color: '#e46a76' }}
                      />
                    }
                    title='Are you sure to delete this comment?'
                    okText='Delete'
                    cancelText='Cancel'
                    okButtonProps={{ style: { background: '#e46a76' } }}
                    onConfirm={handleDeleteComment}
                  >
                    <Button
                      type='text'
                      size='small'
                    >
                      <u>Delete</u>
                    </Button>
                  </Popconfirm>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Comment;
