'use client';

import {
  Button,
  ConfigProvider,
  Space,
  Table,
  TableProps,
  Typography
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { useAppSelector } from '@redux/hooks';

interface DataType {
  key: string;
  teacherId: string;
  tenGiangVien: number;
  email: string;
  birthday: string;
  cccd: string;
  boMonId: string;
  createAt: string;
  updateAt: string;
}

function Index() {
  const { data: listTeacher } = useAppSelector(
    (state) => state.generalState.listTeacher
  );

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Mã giảng viên',
      dataIndex: 'teacherId',
      key: 'teacherId',
      align: 'center'
    },
    {
      title: 'Họ tên',
      dataIndex: 'tenGiangVien',
      key: 'tenGiangVien',
      align: 'center',
      render: (value) => <div className="text-start">{value}</div>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      render: (value) => <div className="text-start">{value}</div>
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      key: 'birthday',
      align: 'center',
      render: (value) => <div>{dayjs(value).format('DD/MM/YYYY')}</div>
    },
    {
      title: 'Số CCCD',
      dataIndex: 'cccd',
      key: 'cccd',
      align: 'center'
    },
    {
      title: 'Bộ môn',
      dataIndex: 'boMonId',
      key: 'boMonId',
      align: 'center'
    }
  ];

  return (
    <div className="p-8">
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemBg: 'transparent'
            }
          }
        }}
      >
        <Table
          title={() => (
            <Typography.Title level={3}>Danh sách giảng viên</Typography.Title>
          )}
          rowKey={(value) => value.teacherId}
          columns={columns}
          dataSource={listTeacher}
          pagination={{ position: ['bottomCenter'] }}
        />
      </ConfigProvider>
    </div>
  );
}

export default Index;
