import { Select } from 'antd';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

import { PriorityModel, ProjectCategoryModel, StatusModel, TaskTypeModel } from 'models/optionsModel';
import { TaskDeTailModel } from 'models/taskModel';
import { useAppDispatch } from 'redux/configureStore';
import taskThunk from 'redux/thunks/taskThunk';
import styles from './styles.module.scss';

interface Props {
  label: string;
  name: string;
  defaultValue: string | number | undefined;
  value: string | number | undefined;
  list: PriorityModel[] | ProjectCategoryModel[] | StatusModel[] | TaskTypeModel[];
  listLabel: string;
  listValue: string;
  setFieldValue: any;
  api?: boolean;
  taskDetail?: TaskDeTailModel | null;
}

const SelectField = ({
  label,
  name,
  defaultValue,
  value,
  list = [],
  listLabel,
  listValue,
  setFieldValue,
  api = false,
  taskDetail,
}: Props) => {
  const dispatch = useAppDispatch();

  const options = useMemo(() => {
    if (Array.isArray(list)) {
      return list.map((option) => {
        return {
          label: option[listLabel],
          value: option[listValue],
        };
      });
    } else {
      return [];
    }
  }, [list, listLabel, listValue]);

  const handleChangeApi = async (value: string | number) => {
    if (!taskDetail) return;

    try {
      switch (name) {
        case 'statusId':
          if (typeof value === 'string') {
            const updateStatus = {
              taskId: taskDetail?.taskId,
              statusId: value,
            };
            await dispatch(taskThunk.updateStatus(updateStatus)).unwrap();
            toast.success('Update status successfully.');
          }
          break;
        case 'priorityId':
          if (typeof value === 'number') {
            const updatePriority = {
              taskId: taskDetail?.taskId,
              priorityId: value,
            };
            await dispatch(taskThunk.updatePriority(updatePriority)).unwrap();
            toast.success('Update priority successfully.');
          }
          break;
        default:
      }

      setFieldValue(name, value);
    } catch (err) {
      if (typeof err === 'string') {
        if (err === 'user is not assign!') {
          toast.error('You are not a member in this isssue.');
        } else {
          toast.error(err);
        }
      } else {
        toast.error('Failed to adjust information.');
        console.error(err);
      }
    }
  };

  const handleChange = (value: string | number) => {
    setFieldValue(name, value);
  };

  return (
    <div className={styles.selectFieldWrapper}>
      <label
        className={styles.label}
        htmlFor={name}
      >
        {label}
      </label>

      <Select
        className={styles.input}
        defaultValue={defaultValue}
        value={value}
        onChange={api ? handleChangeApi : handleChange}
        options={options}
      />
    </div>
  );
};

export default SelectField;
