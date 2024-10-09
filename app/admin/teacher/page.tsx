'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Space, Table, TableProps, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import { apiAllTeacher } from '@/src/api/teacher';
import { formatDate } from '@utils/index';
import dayjs from 'dayjs';

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
  const router = useRouter();
  const [listTeacher, setListTeacher] = useState([]);

  useEffect(() => {
    (async () => {
      //  call api
      const res = await apiAllTeacher();
      setListTeacher(res.items);

      // if (res.status) {
      //   setListTeacher(res.data);
      // }
    })();
  }, []);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
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
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'center',
      render: (value) => {
        const formatedDate = formatDate(value);
        return <div className="text-start">{formatedDate}</div>;
      }
    },
    {
      title: 'Cập nhật',
      dataIndex: 'updateAt',
      key: 'updateAt',
      align: 'center',
      render: (value) => {
        const formatedDate = formatDate(value);
        return <div className="text-start">{formatedDate}</div>;
      }
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              // router.push(`subject/edit/${record.teacherId}`);
            }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              console.log('deleted: ', record.teacherId);
            }}
          />
        </Space>
      )
    }
  ];

  return (
    <div className="p-8">
      <Table
        title={() => (
          <div className="flex items-center justify-between">
            <Typography.Title level={3}>Quản lý giảng viên</Typography.Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              // onClick={() => router.push('/admin/subject/create')}
            >
              Tạo
            </Button>
          </div>
        )}
        rowKey={(value) => value.teacherId}
        columns={columns}
        dataSource={listTeacher}
        pagination={{ position: ['bottomCenter'] }}
      />
    </div>
  );
}

export default Index;
