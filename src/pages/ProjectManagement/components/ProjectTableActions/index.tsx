import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AutoComplete, Avatar, Button, Popconfirm, Popover, Space, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Card from 'components/Card';
import { MemberModel, ProjectModel, ProjectUpdateModel, UserProjectModel } from 'models/projectModel';
import { RootState, useAppDispatch } from 'redux/configureStore';
import { setProjectEdit } from 'redux/slices/projectSlice';
import { setOffcanvas, showOffcanvas } from 'redux/slices/uiControlSlice';
import { projectThunk } from 'redux/thunks/projectThunk';
import { usersThunk } from 'redux/thunks/usersThunk';
import styles from './styles.module.scss';

interface Props {
  project: ProjectModel;
}

const ProjectTableActions = ({ project }: Props) => {
  const { userLogin, getUserList } = useSelector((state: RootState) => state.users);
  const { screenWidth } = useSelector((state: RootState) => state.uiControl);
  const dispatch = useAppDispatch();

  // state of feature which searches and adds a member
  const [searchValue, setSearchValue] = useState('');

  // delete member table data
  const memberColumns: ColumnsType<MemberModel> = [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text: string) => <Avatar src={text} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, member) => (
        <Button
          type='text'
          icon={<CloseCircleOutlined style={{ color: 'var(--error)' }} />}
          onClick={() => handleDeleteMember(member)}
        />
      ),
    },
  ];

  const handleSearchMembersDebounce = _.debounce((value) => {
    dispatch(usersThunk.getuser(value));
  }, 500);

  const handleEditProject = () => {
    dispatch(setOffcanvas(0));
    dispatch(showOffcanvas());
    const projectUpdate: ProjectUpdateModel = {
      id: project.id,
      projectName: project.projectName,
      creator: project.creator.id,
      description: project.description,
      categoryId: String(project.categoryId),
    };
    dispatch(setProjectEdit(projectUpdate));
  };

  const handleDeleteProject = async () => {
    try {
      const response = await dispatch(projectThunk.deleteProject(project.id)).unwrap();
      toast.success(`Delete a project ID ${response[0]} successfully.`);
    } catch (err) {
      if (typeof err === 'string') {
        if (err === 'Project không phải của bạn đâu đừng delete, nhiều bạn phàn nàn lắm đó !') {
          toast.error('You can only delete your own project.');
        } else {
          toast.error(err);
        }
      } else {
        toast.error('Failed to delete a project.');
      }
    }
  };

  const handleAssignMember = async (value: string, option: { label: string }) => {
    setSearchValue(option.label);
    const userProject: UserProjectModel = { projectId: project.id, userId: Number(value) };
    try {
      const response = await dispatch(projectThunk.assignUserProject(userProject)).unwrap();
      toast.success(`${userLogin!.name} ${response}`);
    } catch (err) {
      if (typeof err === 'string') {
        toast.error(err);
      } else {
        toast.error('Failed to assign a member.');
      }
    }
  };

  const handleDeleteMember = async (record: MemberModel) => {
    const userProject: UserProjectModel = { projectId: project.id, userId: record.userId };
    try {
      const response = await dispatch(projectThunk.removeUserFromProject(userProject)).unwrap();
      toast.success(`${userLogin!.name} ${response}`);
    } catch (err) {
      if (typeof err === 'string') {
        toast.error(err);
      } else {
        toast.error('Failed to delete a member.');
      }
    }
  };

  return (
    <div className={styles.tableActionsWrapper}>
      <Space>
        {/* edit project button */}
        <Tooltip
          title={'Edit Project'}
          color='#00c292'
          zIndex={5}
        >
          <Button
            type='text'
            icon={<EditOutlined style={{ color: 'var(--success)' }} />}
            onClick={handleEditProject}
          />
        </Tooltip>

        {/* delete project button */}
        <Tooltip
          title={'Delete project'}
          color='#e46a76'
          zIndex={5}
        >
          <Popconfirm
            icon={
              <FontAwesomeIcon
                icon={faCircleQuestion}
                style={{ color: '#e46a76' }}
              />
            }
            title='Are you sure to delete this project?'
            okText='Delete'
            cancelText='Cancel'
            okButtonProps={{ style: { background: '#e46a76' } }}
            onConfirm={handleDeleteProject}
          >
            <Button
              type='text'
              icon={<DeleteOutlined style={{ color: 'var(--error)' }} />}
            />
          </Popconfirm>
        </Tooltip>

        {/* add member button */}
        <Tooltip
          title={'Add member'}
          color='#03c9d7'
          zIndex={5}
        >
          <Popover
            content={() => (
              <AutoComplete
                style={{
                  width: '100%',
                }}
                options={getUserList.map((u) => ({ label: u.name, value: u.userId.toString() }))}
                value={searchValue}
                placeholder='Insert name'
                onChange={(keyword) => setSearchValue(keyword)}
                onSearch={handleSearchMembersDebounce}
                onSelect={(value, option) => handleAssignMember(value, option)}
              />
            )}
            title='Add member'
            trigger='click'
          >
            <Button
              type='text'
              icon={<PlusCircleOutlined style={{ color: 'var(--info)' }} />}
            />
          </Popover>
        </Tooltip>

        {/* delete member button */}
        <Tooltip
          title={'Delete member'}
          color='#fec90f'
          zIndex={5}
        >
          <Popover
            placement={screenWidth <= 576 ? 'bottomRight' : 'left'}
            content={() => (
              <Card style={{ padding: '0' }}>
                <Table
                  columns={memberColumns}
                  dataSource={project.members}
                  rowKey={'userId'}
                  pagination={false}
                />
              </Card>
            )}
            trigger='click'
          >
            <Button
              type='text'
              icon={<MinusCircleOutlined style={{ color: 'var(--warning)' }} />}
            />
          </Popover>
        </Tooltip>
      </Space>
    </div>
  );
};

export default ProjectTableActions;
