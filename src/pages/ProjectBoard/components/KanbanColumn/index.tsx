import { PlusCircleOutlined } from '@ant-design/icons';
import { faHardDrive, faPenToSquare, faStar, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { MenuProps } from 'antd';
import { Badge, Button, Dropdown, Space } from 'antd';
import { Droppable } from 'react-beautiful-dnd';

import { LstTaskModel } from 'models/projectModel';
import { TaskDeTailModel } from 'models/taskModel';
import Issue from 'pages/ProjectBoard/components/Issue';
import { useAppDispatch } from 'redux/configureStore';
import { setOffcanvas, showOffcanvas } from 'redux/slices/uiControlSlice';
import styles from './styles.module.scss';

interface Props {
  colDetail: LstTaskModel;
  index: number;
}

const KanbanColumn = ({ colDetail, index }: Props) => {
  const dispatch = useAppDispatch();

  const renderIssues = (list: TaskDeTailModel[]) => {
    if (Array.isArray(list)) {
      return colDetail?.lstTaskDeTail?.map((issue, index) => (
        <Issue
          key={index}
          issue={issue}
          index={index}
        />
      ));
    }
  };
  const handleClickAddIssueBtn = () => {
    dispatch(setOffcanvas(1));
    dispatch(showOffcanvas());
  };

  const headerStyle = () => {
    switch (index) {
      case 0:
        return 'var(--error)';
      case 1:
        return 'var(--success)';
      case 2:
        return 'var(--warning)';
      default:
        return 'var(--info)';
    }
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <Space>
          <FontAwesomeIcon icon={faPenToSquare} />
          <span>Rename list</span>
        </Space>
      ),
      key: '0',
    },
    {
      label: (
        <Space>
          <FontAwesomeIcon icon={faStar} />
          <span>Add to favorites</span>
        </Space>
      ),
      key: '1',
    },
    {
      label: (
        <Space>
          <FontAwesomeIcon icon={faHardDrive} />
          <span>Archive list</span>
        </Space>
      ),
      key: '2',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Space style={{ color: '#e46a76' }}>
          <FontAwesomeIcon icon={faTrashCan} />
          <span>Remove</span>
        </Space>
      ),
      key: '4',
    },
  ];

  return (
    <Droppable
      // props of beautiful-dnd
      droppableId={colDetail?.statusId.toString()}
      key={colDetail?.statusId}
      // index={index}
      // className='bg-primary p-2'
      // style={{ minHeight: '500px' }}
    >
      {(provided) => {
        return (
          <div className={styles.kanbanColumWrapper}>
            <div
              className={styles.header}
              style={{ backgroundColor: headerStyle() }}
            >
              <div className={styles.leftSide}>
                <span className={styles.name}>{colDetail?.statusName}</span>
                <Badge
                  count={colDetail?.lstTaskDeTail?.length}
                  style={{ backgroundColor: headerStyle() }}
                />
              </div>

              <div className={styles.rightSide}>
                <Dropdown
                  menu={{ items }}
                  trigger={['click']}
                  placement='bottomLeft'
                >
                  <Button
                    type='text'
                    icon={
                      <FontAwesomeIcon
                        icon={faEllipsis}
                        style={{ color: 'white' }}
                      />
                    }
                  />
                </Dropdown>
              </div>
            </div>

            <ul
              className={styles.issues}
              // props of beautiful-dnd
              key={colDetail?.statusId}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {renderIssues(colDetail?.lstTaskDeTail)}
              {provided.placeholder}
            </ul>

            <button
              className={styles.addIssueBtn}
              onClick={handleClickAddIssueBtn}
            >
              <PlusCircleOutlined style={{ marginRight: '6px' }} />
              Add another issue
            </button>
          </div>
        );
      }}
    </Droppable>
  );
};

export default KanbanColumn;
