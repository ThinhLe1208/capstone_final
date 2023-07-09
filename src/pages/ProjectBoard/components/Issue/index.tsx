import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Tag, Tooltip } from 'antd';
import { useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { useAppDispatch } from 'redux/configureStore';
import { setOffcanvas, showOffcanvas } from 'redux/slices/uiControlSlice';
import styles from './styles.module.scss';
import taskThunk from 'redux/thunks/taskThunk';
import { AssignessModel, TaskDeTailModel } from 'models/taskModel';
import { toast } from 'react-toastify';

interface Props {
  issue: TaskDeTailModel;
  index: number;
}

const Issue = ({ issue, index }: Props) => {
  const dispatch = useAppDispatch();
  const timeRef = useRef(Math.floor(Math.random() * 24 + 1));

  const renderAssigness = (list: AssignessModel[]) => {
    if (Array.isArray(list)) {
      return list.map((assignee, index) => (
        <Tooltip
          key={index}
          title={assignee.name}
          placement='top'
        >
          <Avatar
            className={styles.avatar}
            src={assignee.avatar}
          />
        </Tooltip>
      ));
    }
  };

  const handleClickIssue = async () => {
    try {
      await dispatch(taskThunk.getTaskDetail(issue?.taskId)).unwrap();
      dispatch(setOffcanvas(2));
      dispatch(showOffcanvas());
    } catch (err) {
      if (typeof err === 'string') {
        if (err === 'task is not found!') {
          toast.error('Task is not found.');
        } else {
          toast.error(err);
        }
      } else {
        toast.error('Task is not found.');
        console.error(err);
      }
    }
  };

  const priority = () => {
    switch (issue?.priorityTask?.priorityId) {
      case 1:
        return 'red';
      case 2:
        return 'orange';
      case 3:
        return 'green';
      case 4:
        return '';
      default:
    }
  };

  return (
    <Draggable
      // props of beautiful-dnd
      key={issue?.taskId}
      draggableId={issue?.taskId.toString()}
      index={index}
    >
      {(provided) => {
        return (
          <li
            className={styles.issueWrapper}
            onClick={handleClickIssue}
            data-toggle='modal'
            data-target='#infoModal'
            // props of beautiful-dnd
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {/* <Badge.Ribbon className={styles.tag")} text={issue?.priorityTask?.priority} color={priority()}> */}
            <div className={styles.issue}>
              <Tag
                className={styles.priority}
                color={priority()}
              >
                {issue?.priorityTask?.priority}
              </Tag>

              <Tag
                className={styles.type}
                color={issue.taskTypeDetail?.id === 1 ? 'red' : 'geekblue'}
              >
                {issue.taskTypeDetail?.taskType}
              </Tag>

              <p className={styles.name}>
                <span>Issue:</span>
                {issue?.taskName}
              </p>

              <div className={styles.content}>
                <p className={styles.time}>
                  <ClockCircleOutlined />
                  <span>{timeRef.current}</span>
                  <span>h ago</span>
                </p>

                <Avatar.Group
                  className={styles.assigneeGroup}
                  maxCount={3}
                >
                  {renderAssigness(issue?.assigness)}
                </Avatar.Group>
              </div>
            </div>
            {/* </Badge.Ribbon > */}
          </li>
        );
      }}
    </Draggable>
  );
};

export default Issue;
