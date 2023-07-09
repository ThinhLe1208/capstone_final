import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Avatar, Button, Input, Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import parse from 'html-react-parser';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from 'components/Card';
import Heading from 'components/Heading';
import { ProjectModel } from 'models/projectModel';
import { RootState, useAppDispatch } from 'redux/configureStore';
import { projectThunk } from 'redux/thunks/projectThunk';
import ProjectTableActions from './components/ProjectTableActions';
import styles from './styles.module.scss';

const breadCrumbList = [{ href: '/', title: 'Home' }, { title: 'Project Management' }];

type DataIndex = keyof ProjectModel;

type Props = {};

const ProjectManagement = (props: Props) => {
  const { projectList } = useSelector((state: RootState) => state.project);
  const { projectCategoryList } = useSelector((state: RootState) => state.options);
  const { screenWidth } = useSelector((state: RootState) => state.uiControl);
  const dispatch = useAppDispatch();

  // default state of a table antd library
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    dispatch(projectThunk.getAllProject());
  }, [dispatch]);

  // default handlers of a table antd library
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ProjectModel> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{ padding: 8 }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  // project management table data
  const columns: ColumnsType<ProjectModel> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      responsive: ['xl'],
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a?.id - b?.id,
      sortDirections: ['descend', 'ascend'],
      render: (text) => <span style={{ color: 'var(--sub-text-color)' }}>{text}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'projectName',
      key: 'projectName',
      ...getColumnSearchProps('projectName'),
      sorter: (a, b) => {
        const n1 = a?.projectName.trim().toLowerCase();
        const n2 = b?.projectName.trim().toLowerCase();
        if (n1 < n2) {
          return -1;
        } else {
          return 1;
        }
      },
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return (
          <Link
            to={`/project/${record.id}`}
            style={{ cursor: 'pointer', fontWeight: '600' }}
          >
            {text}
          </Link>
        );
      },
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 200,
      responsive: ['xl'],
      sorter: (a, b) => {
        const n1 = a?.categoryName.trim().toLowerCase();
        const n2 = b?.categoryName.trim().toLowerCase();
        if (n1 < n2) {
          return -1;
        } else {
          return 1;
        }
      },
      sortDirections: ['descend', 'ascend'],
      filters: projectCategoryList?.map((ctg) => ({ text: ctg.projectCategoryName, value: ctg.id })),
      onFilter: (value, record) => record.categoryId === value,
      render: (text) => {
        let color;
        switch (text) {
          case 'Dự án web':
            color = 'purple';
            break;
          case 'Dự án phần mềm':
            color = 'magenta';
            break;
          default:
            color = 'lime';
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 400,
      responsive: ['md'],
      sorter: (a, b) => {
        const n1 = a?.description.trim().toLowerCase();
        const n2 = b?.description.trim().toLowerCase();
        if (n1 < n2) {
          return -1;
        } else {
          return 1;
        }
      },
      sortDirections: ['descend', 'ascend'],
      render: (text) => {
        // description received from Editor tinyMCE is html
        return <span style={{ color: 'var(--sub-text-color)' }}>{parse(text)}</span>;
      },
    },
    {
      title: 'Member',
      dataIndex: 'members',
      key: 'members',
      width: 150,
      responsive: ['lg'],
      render: (_, record) => {
        return (
          <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
            {/* member avatar list */}
            <Avatar.Group
              maxCount={2}
              maxStyle={{ backgroundColor: 'var(--bg-primary)' }}
            >
              {record.members?.map((m) => (
                <Tooltip
                  key={m.userId}
                  title={m.name}
                  placement='top'
                  color='cyan'
                >
                  <Avatar src={m.avatar} />
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'actions',
      align: screenWidth <= 576 ? 'right' : 'left',
      width: 200,
      render: (_, record) => <ProjectTableActions project={record} />,
    },
  ];

  return (
    <div className={styles.projectManagementWrapper}>
      <Heading
        breadCrumbList={breadCrumbList}
        title={'Project Management'}
      />

      {/* rowKey fix error 'child need key' */}
      <Card className={styles.card}>
        <Table
          columns={columns}
          dataSource={projectList}
          rowKey={'id'}
          pagination={{ position: ['bottomCenter'] }}
        />
      </Card>
    </div>
  );
};

export default ProjectManagement;
