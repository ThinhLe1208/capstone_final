import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { faBell, faMessage } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Badge, Button, Layout, Popover } from 'antd';
import { useSelector } from 'react-redux';

import UserPopover from 'components/UserPopover';
import { RootState, useAppDispatch } from 'redux/configureStore';
import { UiControlState, setSidebar } from 'redux/slices/uiControlSlice';
import { UsersState } from 'redux/slices/usersSlice';
import styles from './styles.module.scss';

type Props = {};

const Header = (props: Props) => {
  const { isCollapsed }: UiControlState = useSelector((state: RootState) => state.uiControl);
  const { userLogin }: UsersState = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();

  return (
    <Layout.Header className={styles.headerWrapper}>
      <div className={styles.leftSide}>
        <Button
          className={styles.sidebarBtn + ' ' + styles.iconBtn}
          type='text'
          icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => dispatch(setSidebar())}
        />
      </div>

      <div className={styles.rightSide}>
        <Button
          className={styles.sidebarBtn + ' ' + styles.iconBtn}
          type='text'
          icon={
            <Badge
              count={3}
              color='var(--info)'
              size='small'
              style={{ fontSize: '8px' }}
            >
              <FontAwesomeIcon
                icon={faMessage}
                className={styles.icon}
              />
            </Badge>
          }
        />

        <Button
          className={styles.sidebarBtn + ' ' + styles.iconBtn}
          type='text'
          icon={
            <Badge
              count={6}
              color='var(--error)'
              size='small'
              style={{ fontSize: '8px' }}
            >
              <FontAwesomeIcon
                icon={faBell}
                className={styles.icon}
              />
            </Badge>
          }
        />

        <div className={styles.divider} />

        <Popover
          content={<UserPopover userLogin={userLogin} />}
          trigger='click'
          placement='bottomRight'
        >
          <Button
            className={styles.userBtn}
            type='text'
          >
            <Avatar
              className={styles.avatar}
              src={userLogin?.avatar}
            />

            <span className={styles.greeting}>
              Hi, <span className={styles.name}>{userLogin?.name}</span>
            </span>

            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </Popover>
      </div>
    </Layout.Header>
  );
};

export default Header;
