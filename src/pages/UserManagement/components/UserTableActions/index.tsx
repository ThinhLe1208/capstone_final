import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Popconfirm, Space, Tooltip } from 'antd';

import { User, UserJiraModelUpdateModel } from 'models/usersModel';
import { useAppDispatch } from 'redux/configureStore';
import { setOffcanvas, showOffcanvas } from 'redux/slices/uiControlSlice';
import { setUserEdit } from 'redux/slices/usersSlice';
import styles from './styles.module.scss';
import { usersThunk } from 'redux/thunks/usersThunk';
import { toast } from 'react-toastify';

interface Props {
  user: User;
}

const UserTableActions = ({ user }: Props) => {
  const dispatch = useAppDispatch();

  const handleEditUser = () => {
    const userEdit: UserJiraModelUpdateModel = {
      id: String(user.userId),
      passWord: '',
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
    };
    dispatch(setUserEdit(userEdit));
    dispatch(setOffcanvas(3));
    dispatch(showOffcanvas());
  };

  const handleRemoveUser = async () => {
    try {
      await dispatch(usersThunk.deleteUser(user.userId)).unwrap();
      toast.success('Delete user successfully.');
    } catch (err) {
      if (typeof err === 'string') {
        if (err === 'Người dùng đã tạo project không thể xoá được !') {
          toast.error('The user who created the project cannot be deleted.');
        } else {
          toast.error(err);
        }
      } else {
        toast.error('Failed to delete user.');
      }
    }
  };

  return (
    <div className={styles.userTableActionsWrapper}>
      <Space>
        {/* edit user button */}
        <Tooltip
          title={'Edit User'}
          color='#00c292'
          zIndex={5}
        >
          <Button
            type='text'
            icon={<EditOutlined style={{ color: 'var(--success)' }} />}
            onClick={handleEditUser}
          />
        </Tooltip>

        {/* remove user button */}
        <Tooltip
          title={'Delete user'}
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
            title='Are you sure to delete this user?'
            okText='Delete'
            cancelText='Cancel'
            okButtonProps={{ style: { background: '#e46a76' } }}
            onConfirm={handleRemoveUser}
          >
            <Button
              type='text'
              icon={<DeleteOutlined style={{ color: 'var(--error)' }} />}
            />
          </Popconfirm>
        </Tooltip>
      </Space>
    </div>
  );
};

export default UserTableActions;
