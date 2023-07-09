import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { ACCESS_TOKEN, REMEMBER_USER, USER_LOGIN } from 'utils/constants';
import styles from './styles.module.scss';
import storage from 'utils/storage';

type Props = {};

const AuthTemplate = (props: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    // check the user 's remember status
    if (
      storage.getStorageJson(USER_LOGIN) &&
      storage.getStorageJson(ACCESS_TOKEN) &&
      storage.getStorageJson(REMEMBER_USER)
    ) {
      navigate('/project');
    }
  }, [navigate]);

  return (
    <div className={styles.authTemplateWrapper}>
      <div className={styles.leftSide}>
        <img
          src={require('assets/images/auth_background.svg').default}
          alt='img'
        />
      </div>

      <div className={styles.rightSide}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthTemplate;
