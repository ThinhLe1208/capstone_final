import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';

import Card from 'components/Card';
import Heading from 'components/Heading';
import { User } from 'models/usersModel';
import { RootState, useAppDispatch } from 'redux/configureStore';
import { usersThunk } from 'redux/thunks/usersThunk';
import UserTableActions from './components/UserTableActions';
import styles from './styles.module.scss';

const breadCrumbList = [{ href: '/', title: 'Home' }, { title: 'Users Management' }];

type DataIndex = keyof User;

interface Props {}

const UserManagement = (props: Props) => {
  const { getUserList } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();

  // default state of a table antd library
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    dispatch(usersThunk.getuser());
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<User> => ({
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

  // users management table data
  const columns: ColumnsType<User> = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 160,
      responsive: ['xl'],
      ...getColumnSearchProps('userId'),
      sorter: (a, b) => a?.userId - b?.userId,
      sortDirections: ['descend', 'ascend'],
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => {
        const n1 = a?.name.trim().toLowerCase();
        const n2 = b?.name.trim().toLowerCase();
        if (n1 < n2) {
          return -1;
        } else {
          return 1;
        }
      },
      sortDirections: ['descend', 'ascend'],
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 360,
      responsive: ['sm'],
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 240,
      responsive: ['md'],
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'actions',
      width: 140,
      render: (_, record) => <UserTableActions user={record} />,
    },
  ];

  return (
    <div className={styles.usersManagementWrapper}>
      <Heading
        breadCrumbList={breadCrumbList}
        title={'Users Management'}
      />

      {/* rowKey fix error 'child need key' */}
      <Card className={styles.card}>
        <Table
          columns={columns}
          dataSource={getUserList}
          rowKey={'userId'}
          pagination={{ position: ['bottomCenter'] }}
        />
      </Card>
    </div>
  );
};

export default UserManagement;
