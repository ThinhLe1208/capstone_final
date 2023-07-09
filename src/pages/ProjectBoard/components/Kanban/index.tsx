import _ from 'lodash';
import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';

import { LstTaskModel, ProjectDetailModel } from 'models/projectModel';
import { UpdateStatusVM } from 'models/taskModel';
import KanbanColumn from 'pages/ProjectBoard/components/KanbanColumn';
import { useAppDispatch } from 'redux/configureStore';
import taskThunk from 'redux/thunks/taskThunk';
import styles from './styles.module.scss';

interface Props {
  projectDetail: ProjectDetailModel | null;
}

const Kanban = ({ projectDetail }: Props) => {
  const [listTask, setListTask] = useState(projectDetail?.lstTask);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 1st render lstTask is empty
    setListTask(projectDetail?.lstTask);
  }, [projectDetail?.lstTask]);

  const renderColumns = (list: LstTaskModel[] | undefined) => {
    if (Array.isArray(list)) {
      return list?.map((colDetail, index) => (
        <div key={index}>
          <KanbanColumn
            colDetail={colDetail}
            index={index}
          />
        </div>
      ));
    }
  };

  const handleDragEnd = (data: DropResult) => {
    const { source, destination, draggableId } = data;

    if (!destination) {
      return;
    }

    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }

    if (listTask) {
      let preList = _.cloneDeep(listTask);
      // find task
      const srcCol = preList.find((col) => col.statusId === source.droppableId);
      if (srcCol) {
        const srcTask = srcCol.lstTaskDeTail[source.index];
        // remove task from column
        srcCol.lstTaskDeTail.splice(source.index, 1);
        // add task to destination
        const desCol = preList.find((col) => col.statusId === destination.droppableId);
        if (desCol) {
          desCol.lstTaskDeTail.splice(destination.index, 0, srcTask);

          setListTask(preList);
        } else {
          return;
        }
      } else {
        return;
      }
    }

    if (projectDetail) {
      const updateStatus: UpdateStatusVM = {
        taskId: Number(draggableId),
        statusId: destination.droppableId,
      };
      handleUpdatePriority(updateStatus);
    }
  };

  const handleUpdatePriority = async (updateStatus: UpdateStatusVM) => {
    try {
      const response = await dispatch(taskThunk.updateStatus(updateStatus)).unwrap();

      if (response === 'Update task successfully!') {
        toast.success('Update issue successfully.');
      } else {
        toast.success(response);
      }
    } catch (err) {
      toast.error('Failed to update issue.');
    }
  };

  return (
    <div className={styles.kanbanWrapper}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.columns}>{renderColumns(listTask)}</div>
      </DragDropContext>
    </div>
  );
};

export default Kanban;
