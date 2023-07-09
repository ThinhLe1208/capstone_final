import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Input, Row, Segmented } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Heading from 'components/Heading';
import BoardDetail from 'pages/ProjectBoard/components/BoardDetail';
import Kanban from 'pages/ProjectBoard/components/Kanban';
import { toast } from 'react-toastify';
import { RootState, useAppDispatch } from 'redux/configureStore';
import { projectThunk } from 'redux/thunks/projectThunk';
import styles from './styles.module.scss';

interface Props {}

const ProjectBoard = (props: Props) => {
  const { projectDetail } = useSelector((state: RootState) => state.project);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const breadCrumbList = [
    { href: '/', title: 'Home' },
    { href: '/project', title: 'Project' },
    { title: projectDetail?.projectName },
  ];

  useEffect(() => {
    const getProjectDetail = async () => {
      try {
        await dispatch(projectThunk.getProjectDetail(Number(params.projectId))).unwrap();
      } catch (err) {
        if (typeof err === 'string') {
          toast.error(err);
        } else {
          toast.error('Project is not found.');
        }
        navigate('/project/management');
      }
    };

    if (params.projectId) {
      getProjectDetail();
    }
  }, [dispatch, navigate, params.projectId]);

  return (
    <div className={styles.projectBoardWrapper}>
      <Heading
        breadCrumbList={breadCrumbList}
        title={projectDetail?.projectName}
      />

      <div className={styles.detail}>
        <BoardDetail />
      </div>

      <Row className={styles.filter}>
        <Col className={styles.filterLeft}>
          <Input
            className={styles.search}
            placeholder='Search...'
            prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          />
          <Button>Only my issues</Button>
          <Button>Recently updated</Button>
        </Col>

        <Col className={styles.filterRight}>
          <Segmented
            options={[
              {
                label: 'Kanban',
                value: 'Kanban',
                icon: <AppstoreOutlined />,
              },
              {
                label: 'List',
                value: 'List',
                icon: <BarsOutlined />,
              },
            ]}
          />
        </Col>
      </Row>

      <div className={styles.board}>
        <Kanban projectDetail={projectDetail} />
      </div>
    </div>
  );
};

export default ProjectBoard;
