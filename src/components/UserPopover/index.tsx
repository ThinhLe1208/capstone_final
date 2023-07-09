import { faComments, faEnvelope, faIdCard, faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN, REMEMBER_USER, USER_LOGIN } from 'utils/constants';

import { UserLoginModel } from 'models/usersModel';
import storage from 'utils/storage';
import styles from './styles.module.scss';

type Props = {
  userLogin: UserLoginModel | undefined;
};

const UserPopover = ({ userLogin }: Props) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    storage.clearStorage(ACCESS_TOKEN);
    storage.clearStorage(USER_LOGIN);
    storage.clearStorage(REMEMBER_USER);
    navigate('/signin');
    toast.success('Log out successfully !');
  };

  return (
    <div className={styles.userPopoverWrapper}>
      <h3 className={styles.title}>User Profile</h3>

      <div className={styles.row + ' ' + styles.heading}>
        <Avatar
          className={styles.avatar}
          src={userLogin?.avatar}
        />
        <div className={styles.content}>
          <h3>{userLogin?.name}</h3>
          <p>Administrator</p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} />
            <span className={styles.detail}>{userLogin?.email}</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} />
            <span className={styles.detail}>{userLogin?.phoneNumber}</span>
          </p>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faIdCard} />
        </div>
        <div className={styles.content}>
          <h3>My Profile</h3>
          <p>Account Settings</p>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faComments} />
        </div>
        <div className={styles.content}>
          <h3>My Inbox</h3>
          <p>Messages & Emails</p>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faRectangleList} />
        </div>
        <div className={styles.content}>
          <h3>My Tasks</h3>
          <p>To-do and Daily Tasks</p>
        </div>
      </div>

      <Button
        type='primary'
        block
        onClick={handleLogOut}
      >
        Log Out
      </Button>
    </div>
  );
};

export default UserPopover;
