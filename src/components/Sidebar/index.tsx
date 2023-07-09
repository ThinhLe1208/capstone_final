import { ClusterOutlined, FileAddOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { RootState } from 'redux/configureStore';
import styles from './styles.module.scss';

interface Props {}

const Sidebar = (props: Props) => {
  const { screenWidth, isCollapsed } = useSelector((state: RootState) => state.uiControl);
  const [selectedMenuItem, setSelectedMenuItem] = useState('board');
  const href = useLocation();

  // find sidebar active item
  useEffect(() => {
    let key = href.pathname.split('/').pop();
    if (!key) return;
    setSelectedMenuItem(key);
  }, [href]);

  const itemsTop: MenuProps['items'] = [
    {
      label: <Link to='/project'>Project management</Link>,
      key: 'project',
      icon: <ClusterOutlined className={styles.icon} />,
    },
    {
      label: <Link to='/project/create'>Create project</Link>,
      key: 'create',
      icon: <FileAddOutlined className={styles.icon} />,
    },
    {
      label: <Link to='/users'>Users management</Link>,
      key: 'users',
      icon: <UserOutlined className={styles.icon} />,
    },
  ];

  return (
    <Layout.Sider
      className={styles.sidebarWrapper}
      collapsedWidth={screenWidth <= 576 ? 0 : 80}
      width={210}
      trigger={null}
      collapsible
      collapsed={isCollapsed}
      style={{
        background: '#fff',
      }}
    >
      <img
        className={styles.logo}
        src={require('assets/images/logo_jira.png')}
        alt='logo_jira'
      />

      <div className={styles.menu}>
        <Menu
          mode='inline'
          items={itemsTop}
          selectedKeys={[selectedMenuItem]}
          style={{ border: 'none' }}
        />
      </div>
    </Layout.Sider>
  );
};

export default Sidebar;
