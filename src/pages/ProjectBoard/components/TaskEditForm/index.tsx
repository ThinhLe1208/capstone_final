import { DeleteOutlined, LinkOutlined, SendOutlined } from '@ant-design/icons';
import { faBug, faCircleQuestion, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Divider, Popconfirm, Popover, Row, Space } from 'antd';
import { FormikProps, useFormik } from 'formik';
import parse from 'html-react-parser';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Card from 'components/Card';
import EditorField from 'components/EditorField';
import InputField from 'components/InputField';
import InputNumberField from 'components/InputNumberField';
import MultiSelectField from 'components/MultiSelectField';
import SelectField from 'components/SelectField';
import SliderField from 'components/SliderField';
import { TaskEditModel } from 'models/taskModel';
import { RootState, useAppDispatch } from 'redux/configureStore';
import { hideOffcanvas } from 'redux/slices/uiControlSlice';
import taskThunk from 'redux/thunks/taskThunk';
import CommentBoard from '../CommentBoard';
import styles from './styles.module.scss';

const TaskEditSchema = Yup.object().shape({
  taskName: Yup.string().required('Please provide an issue name.'),
});

interface Props {}

const TaskEditForm = (props: Props) => {
  const dispatch = useAppDispatch();

  const { projectDetail } = useSelector((state: RootState) => state.project);
  const { taskDetail } = useSelector((state: RootState) => state.task);
  const { statusList, priorityList } = useSelector((state: RootState) => state.options);

  let [isEditingName, setIsEditingName] = useState(false);
  let [isEditingDes, setIsEditingDes] = useState(false);
  let [isEditingEstimate, setIsEditinEstimate] = useState(false);
  // history values in case user click cancel button, show old values; in case user click accept button, set new values
  let [contentName, setContentName] = useState(taskDetail?.taskName);
  let [contentEditor, setContentEditor] = useState(taskDetail?.description);
  let [contentEstimate, setContentEstimate] = useState(taskDetail?.originalEstimate);
  let [openTracking, setOpenTracking] = useState(false);

  // Formik
  const initialValues: TaskEditModel = useMemo(() => {
    if (taskDetail) {
      return {
        listUserAsign: taskDetail?.assigness.map((assig) => assig.id),
        taskId: String(taskDetail.taskId),
        taskName: taskDetail.taskName,
        description: taskDetail.description,
        statusId: taskDetail.statusId,
        originalEstimate: taskDetail.originalEstimate,
        timeTrackingSpent: taskDetail.timeTrackingSpent,
        timeTrackingRemaining: taskDetail.timeTrackingRemaining,
        projectId: taskDetail.projectId,
        typeId: taskDetail.typeId,
        priorityId: taskDetail.priorityId,
      };
    } else {
      return {
        listUserAsign: [],
        taskId: '',
        taskName: '',
        description: '',
        statusId: '',
        originalEstimate: -1,
        timeTrackingSpent: -1,
        timeTrackingRemaining: -1,
        projectId: -1,
        typeId: -1,
        priorityId: -1,
      };
    }
  }, [taskDetail]);

  const { values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }: FormikProps<TaskEditModel> =
    useFormik<TaskEditModel>({
      enableReinitialize: true,
      initialValues: initialValues,
      validationSchema: TaskEditSchema,
      onSubmit: async (values) => {
        try {
          const response = await dispatch(taskThunk.updateTask(values)).unwrap();
          toast.success('Update task successfully.');
          // taskName
          setIsEditingName(false);
          setContentName(response.taskName);
          // description
          setIsEditingDes(false);
          setContentEditor(response.description);
        } catch (err) {
          if (typeof err === 'string') {
            if (err === 'Task is not found!') {
              toast.error('Task is not found.');
            } else {
              toast.error(err);
            }
          } else {
            toast.error('Failed to update.');
            console.error(err);
          }
        }
      },
    });

  const items = [
    {
      label: (
        <Space>
          <FontAwesomeIcon
            icon={faSquareCheck}
            style={{ color: '#03c9d7' }}
          />
          <span>new task</span>
        </Space>
      ),
      key: '0',
    },
    {
      label: (
        <Space>
          <FontAwesomeIcon
            icon={faBug}
            style={{ color: '#e46a76' }}
          />
          <span>bug</span>
        </Space>
      ),
      key: '1',
    },
  ];

  const handleCancelTaskName = () => {
    setIsEditingName(false);
    // set the taskName 's content back to old value
    setFieldValue('taskName', contentName);
  };

  const handleCancelDescription = () => {
    setIsEditingDes(false);
    // set the description 's content back to old value
    setFieldValue('description', contentEditor);
  };

  const handleShowDescription = () => {
    setIsEditingDes(true);
    // update the description 's content to be the same as the api data
    setFieldValue('description', taskDetail?.description);
  };

  const handleCancelEstimate = () => {
    setIsEditinEstimate(false);
    // set the estimate 's content back to old value
    setFieldValue('originalEstimate', contentEstimate);
  };

  const handleChangeEstimateTime = async () => {
    if (!taskDetail?.taskId) return;

    try {
      const updateEstimate = {
        taskId: taskDetail?.taskId,
        originalEstimate: values.originalEstimate,
      };
      await dispatch(taskThunk.updateEstimate(updateEstimate)).unwrap();
      toast.success('Update estimate time successfully.');
      setIsEditinEstimate(false);
      setContentEstimate(values.originalEstimate);
    } catch (err) {
      if (typeof err === 'string') {
        if (err === 'user is not assign!') {
          toast.error('You are not a member in this isssue.');
        } else {
          toast.error(err);
        }
      } else {
        toast.error('Failed to update estimate time.');
        console.error(err);
      }
    }
  };

  const handleChangeTrackingTime = async () => {
    if (!taskDetail?.taskId) return;

    try {
      const updateTimeTracking = {
        taskId: taskDetail?.taskId,
        timeTrackingSpent: values.timeTrackingSpent,
        timeTrackingRemaining: values.timeTrackingRemaining,
      };
      await dispatch(taskThunk.updateTimeTracking(updateTimeTracking)).unwrap();
      toast.success('Update tracking time successfully.');
    } catch (err) {
      if (typeof err === 'string') {
        if (err === 'user is not assign!') {
          toast.error('You are not a member in this isssue.');
        } else {
          toast.error(err);
        }
      } else {
        toast.error('Failed to update tracking time.');
        console.error(err);
      }
    }
  };

  const handleDeleteTask = async () => {
    if (taskDetail) {
      try {
        await dispatch(taskThunk.removeTask(taskDetail?.taskId)).unwrap();
        toast.success('Remove task successfully.');
        dispatch(hideOffcanvas());
      } catch (err) {
        // content of an error response is empty
        toast.error('Failed to remove task.');
      }
    }
  };

  const renderTaskName = () => {
    return (
      <>
        {isEditingName ? (
          <>
            <div className={styles.row}>
              <InputField
                name='taskName'
                value={values.taskName}
                error={errors.taskName}
                touched={touched.taskName}
                placeholder='Insert task name'
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <Space>
              <Button
                type='primary'
                size='small'
                onClick={() => handleSubmit()}
              >
                Save
              </Button>
              <Button
                type='text'
                size='small'
                onClick={handleCancelTaskName}
              >
                Cancel
              </Button>
            </Space>
          </>
        ) : (
          <div style={{ marginLeft: '-16px' }}>
            <Button
              type='text'
              onClick={() => setIsEditingName(true)}
            >
              <span className={styles.taskName}>{contentName}</span>
            </Button>
          </div>
        )}
      </>
    );
  };

  const renderDescription = () => {
    const jsxDescription = taskDetail?.description && parse(taskDetail?.description);

    return (
      <>
        {isEditingDes ? (
          <div className={styles.row}>
            <div className={styles.row}>
              <EditorField
                name='description'
                height={150}
                value={values.description}
                setFieldValue={setFieldValue}
              />
            </div>
            <Space>
              <Button
                type='primary'
                size='small'
                onClick={() => handleSubmit()}
              >
                Save
              </Button>
              <Button
                type='text'
                size='small'
                onClick={handleCancelDescription}
              >
                Cancel
              </Button>
            </Space>
          </div>
        ) : (
          <div onClick={handleShowDescription}>
            {typeof jsxDescription === 'string' && jsxDescription.length === 0 ? (
              <p className={styles.subTitle}>Add a description...</p>
            ) : (
              jsxDescription
            )}
          </div>
        )}
      </>
    );
  };

  const renderEstimateTime = () => {
    return (
      <>
        {isEditingEstimate ? (
          <>
            <div className={styles.row}>
              <InputNumberField
                name='originalEstimate'
                defaultValue={values.originalEstimate}
                value={values.originalEstimate}
                setFieldValue={setFieldValue}
                min={0}
              />
            </div>
            <Space>
              <Button
                type='primary'
                size='small'
                onClick={handleChangeEstimateTime}
              >
                Save
              </Button>
              <Button
                type='text'
                size='small'
                onClick={handleCancelEstimate}
              >
                Cancel
              </Button>
            </Space>
          </>
        ) : (
          <div style={{ marginLeft: '-16px' }}>
            <Button
              type='text'
              onClick={() => setIsEditinEstimate(true)}
            >
              <span>{`${contentEstimate}`} hour(s)</span>
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <form className={styles.taskEditFormWrapper}>
      {/* header */}
      <div className={styles.header}>
        {/* left header */}
        <Button
          type='text'
          style={{ color: 'var(--sub-text-color)' }}
        >
          {taskDetail?.taskTypeDetail?.id === 2 ? items[0].label : items[1].label}-{taskDetail?.taskId}
        </Button>

        {/* right header */}
        <Space>
          <Button
            type='text'
            icon={<SendOutlined />}
          >
            Give feedback
          </Button>
          <Button
            type='text'
            icon={<LinkOutlined />}
          >
            Copy link
          </Button>
          <Popconfirm
            icon={
              <FontAwesomeIcon
                icon={faCircleQuestion}
                style={{ color: '#e46a76' }}
              />
            }
            title='Are you sure to delete this issue?'
            okText='Delete'
            cancelText='Cancel'
            okButtonProps={{ style: { background: '#e46a76' } }}
            onConfirm={handleDeleteTask}
          >
            <Button
              type='text'
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      </div>

      {/* body */}
      <Row gutter={[24, 16]}>
        {/* Leftside */}
        <Col
          xs={24}
          md={15}
        >
          {/* content */}
          <Card style={{ marginBottom: '20px' }}>
            <div className={styles.row}>{renderTaskName()}</div>

            <div className={styles.row}>
              <p className={styles.description}>Desciption</p>
              {renderDescription()}
            </div>
          </Card>

          {/* comment */}
          <CommentBoard taskDetail={taskDetail} />
        </Col>

        {/* Rightside */}
        <Col
          xs={24}
          md={9}
        >
          <Card>
            {/* Status */}
            <div className={styles.row}>
              <SelectField
                label='Status'
                name='statusId'
                defaultValue={values.statusId}
                value={values.statusId}
                list={statusList}
                listLabel='statusName'
                listValue='statusId'
                setFieldValue={setFieldValue}
                api={true}
                taskDetail={taskDetail}
              />
            </div>

            {/* Priority */}
            <div className={styles.row}>
              <SelectField
                label='Priority'
                name='priorityId'
                defaultValue={values.priorityId}
                value={values.priorityId}
                list={priorityList}
                listLabel='priority'
                listValue='priorityId'
                setFieldValue={setFieldValue}
                api={true}
                taskDetail={taskDetail}
              />
            </div>

            {/* Member */}
            <div className={styles.row}>
              <MultiSelectField
                label='Assign member'
                name='listUserAsign'
                defaultValue={values.listUserAsign}
                list={projectDetail?.members}
                listLabel='name'
                listValue='userId'
                setFieldValue={setFieldValue}
                placeholder='Select member'
                api={true}
                taskDetail={initialValues}
              />
            </div>

            {/* Time tracking */}
            <div className={styles.row}>
              <p className={styles.estimate}>Estimate time</p>
              {renderEstimateTime()}
            </div>

            <Popover
              content={
                <div className={styles.timePopover}>
                  <h3>Time tracking</h3>
                  <p>{`The original estimate for this issue was ${values.originalEstimate}h.`}</p>
                  <InputNumberField
                    label='Time spent (hours)'
                    name='timeTrackingSpent'
                    defaultValue={0}
                    value={values.timeTrackingSpent}
                    setFieldValue={setFieldValue}
                    min={0}
                  />
                  <div style={{ marginTop: '8px' }}>
                    <InputNumberField
                      label='Time remaining (hours)'
                      name='timeTrackingRemaining'
                      defaultValue={values.timeTrackingRemaining}
                      value={values.timeTrackingRemaining}
                      setFieldValue={setFieldValue}
                      min={0}
                    />
                  </div>
                  <div style={{ marginTop: '8px', textAlign: 'end' }}>
                    <Button
                      type='primary'
                      onClick={handleChangeTrackingTime}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              }
              trigger='click'
              open={openTracking}
              onOpenChange={(e) => setOpenTracking(e)}
            >
              <div className={styles.row}>
                <SliderField
                  label='Time Tracking'
                  name='timeTrackingSpent'
                  spentValue={values.timeTrackingSpent}
                  remainValue={values.timeTrackingRemaining}
                  estimateValue={values.originalEstimate}
                />
              </div>
            </Popover>
          </Card>

          <Divider />

          {/* time */}
          <div style={{ color: '#929398' }}>Create at a month ago</div>
          <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
        </Col>
      </Row>
    </form>
  );
};

export default TaskEditForm;
