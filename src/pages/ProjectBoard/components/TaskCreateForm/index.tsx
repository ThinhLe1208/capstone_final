import { Col, Row } from 'antd';
import { useFormik } from 'formik';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import EditorField from 'components/EditorField';
import InputField from 'components/InputField';
import InputNumberField from 'components/InputNumberField';
import MultiSelectField from 'components/MultiSelectField';
import SelectField from 'components/SelectField';
import SliderField from 'components/SliderField';
import { TaskInsertModel } from 'models/taskModel';
import { RootState, useAppDispatch } from 'redux/configureStore';
import taskThunk from 'redux/thunks/taskThunk';
import styles from './styles.module.scss';
import { hideOffcanvas } from 'redux/slices/uiControlSlice';

const TaskCreateSchema = Yup.object().shape({
  taskName: Yup.string().required('Please provide an issue name.'),
});

interface Props {}

const TaskCreateForm = forwardRef<HTMLFormElement, Props>((props, ref) => {
  const { projectDetail } = useSelector((state: RootState) => state.project);
  const { taskTypeList, priorityList, statusList } = useSelector((state: RootState) => state.options);
  const dispatch = useAppDispatch();

  // Formik
  const initialValues: TaskInsertModel = {
    listUserAsign: [],
    taskName: '',
    description: '',
    statusId: '1',
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    projectId: projectDetail?.id || -1,
    typeId: 1,
    priorityId: 1,
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: TaskCreateSchema,
    onSubmit: async (values) => {
      const newTask: TaskInsertModel = {
        ...values,
        timeTrackingRemaining: values.originalEstimate - values.timeTrackingSpent,
      };
      try {
        await dispatch(taskThunk.createTask(newTask)).unwrap();
        toast.success('Create a task successfully.');
        dispatch(hideOffcanvas());
      } catch (err) {
        if (typeof err === 'string') {
          if (err === 'task already exists!') {
            toast.error('Task name already exists.');
          } else {
            toast.error('Failed to create a task.');
          }
        } else {
          toast.error('Failed to create a task.');
          console.error(err);
        }
      }
    },
  });

  return (
    <div className={styles.taskCreateFormWrapper}>
      <form
        ref={ref}
        onSubmit={handleSubmit}
      >
        <Row
          className={styles.row}
          gutter={[18, 18]}
        >
          <Col
            xs={24}
            md={12}
          >
            <InputField
              label='Issue name'
              name='taskName'
              value={values.taskName}
              error={errors.taskName}
              touched={touched.taskName}
              placeholder='Insert task name'
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>

          <Col
            xs={24}
            md={12}
          >
            <SelectField
              label='Status'
              name='statusId'
              defaultValue={values.statusId}
              value={values.statusId}
              list={statusList}
              listLabel='statusName'
              listValue='statusId'
              setFieldValue={setFieldValue}
            />
          </Col>
        </Row>

        <Row
          className={styles.row}
          gutter={[18, 18]}
        >
          <Col
            xs={24}
            md={12}
          >
            <SelectField
              label='Priority'
              name='priorityId'
              defaultValue={values.priorityId}
              value={values.priorityId}
              list={priorityList}
              listLabel='priority'
              listValue='priorityId'
              setFieldValue={setFieldValue}
            />
          </Col>
          <Col
            xs={24}
            md={12}
          >
            <SelectField
              label='Type'
              name='typeId'
              defaultValue={values.typeId}
              value={values.typeId}
              list={taskTypeList}
              listLabel='taskType'
              listValue='id'
              setFieldValue={setFieldValue}
            />
          </Col>
        </Row>

        <div className={styles.row}>
          <EditorField
            label='Desciption'
            name='description'
            height={250}
            value={values.description}
            setFieldValue={setFieldValue}
          />
        </div>

        <div className={styles.row}>
          <MultiSelectField
            label='Assign member'
            name='listUserAsign'
            defaultValue={[]}
            list={projectDetail?.members}
            listLabel='name'
            listValue='userId'
            setFieldValue={setFieldValue}
            placeholder='Select member'
          />
        </div>

        <div className={styles.row}>
          <SliderField
            label='Time Tracking'
            name='timeTrackingSpent'
            spentValue={values.timeTrackingSpent}
            estimateValue={values.originalEstimate}
          />
        </div>

        <Row
          className={styles.row}
          gutter={[18, 18]}
        >
          <Col
            xs={24}
            md={12}
          >
            <InputNumberField
              label='Total Estimated Hours'
              name='originalEstimate'
              defaultValue={0}
              value={values.originalEstimate}
              setFieldValue={setFieldValue}
              min={values.timeTrackingSpent}
            />
          </Col>
          <Col
            xs={24}
            md={12}
          >
            <InputNumberField
              label='Hours spent'
              name='timeTrackingSpent'
              defaultValue={0}
              value={values.timeTrackingSpent}
              setFieldValue={setFieldValue}
              min={0}
              max={values.originalEstimate}
            />
          </Col>
        </Row>
      </form>
    </div>
  );
});

export default TaskCreateForm;
