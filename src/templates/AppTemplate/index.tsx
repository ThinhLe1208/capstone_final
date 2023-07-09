import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Content } from 'antd/es/layout/layout';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { useAppDispatch } from 'redux/configureStore';
import { setScreenWidth } from 'redux/slices/uiControlSlice';
import { optionsThunk } from 'redux/thunks/optionsThunk';
import storage from 'utils/storage';
import styles from './styles.module.scss';

interface Props {}

const AppTemplate = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(optionsThunk.getPriority());
    dispatch(optionsThunk.getAllProjectCategory());
    dispatch(optionsThunk.getAllStatus());
    dispatch(optionsThunk.getAllTaskType());
  }, [dispatch]);

  useEffect(() => {
    const isLogin = storage.checkLogin();
    if (!isLogin) {
      toast.error('You must log in first.', { toastId: 'login request' });
      navigate('/');
    }
  }, [navigate]);

  // get a current screenwidth to make website responsive with the ant library
  useEffect(() => {
    const handleSetScreenWidth = () => {
      dispatch(setScreenWidth(window.innerWidth));
    };

    window.addEventListener('load', handleSetScreenWidth);
    window.addEventListener('resize', handleSetScreenWidth);

    return () => {
      window.removeEventListener('load', handleSetScreenWidth);
      window.removeEventListener('resize', handleSetScreenWidth);
    };
  }, [dispatch]);

  return (
    <Layout
      className={styles.appTemplateWrapper}
      hasSider
    >
      <Sidebar />
      <Layout className={styles.body}>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppTemplate;
