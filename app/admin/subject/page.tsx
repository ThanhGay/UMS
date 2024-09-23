'use client';

import { useEffect, useState } from 'react';
import { Button, Space, Table, TableProps, Typography } from 'antd';
import { apiAllSubject } from '@/src/api/subject';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { formatDate } from '@utils/index';

interface DataType {
  key: string;
  id: string;
  maHocPhan: number;
  name: string;
  soTinChi: string;
  createAt: string;
  updateAt: string;
}

function Index() {
  const router = useRouter();
  const [listSubject, setListSubject] = useState([]);

  useEffect(() => {
    (async () => {
      //  call api
      const res = await apiAllSubject();

      if (res.status) {
        setListSubject(res.data);
      }
    })();
  }, []);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: 'Mã học phần',
      dataIndex: 'maHocPhan',
      key: 'maHocPhan',
      align: 'center',
      render: (value) => <div className="text-start">{value}</div>
    },
    {
      title: 'Tên môn học',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (value) => <div className="text-start">{value}</div>
    },
    {
      title: 'Số tín chỉ',
      dataIndex: 'soTinChi',
      key: 'soTinChi',
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
              router.push(`subject/edit/${record.id}`);
            }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              console.log('deleted: ', record.id);
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
            <Typography.Title level={3}>Quản lý môn học</Typography.Title>
            <Button
              className="create-subject"
              type="primary"
              onClick={() => router.push('/admin/subject/create')}
            >
              Tạo
            </Button>
          </div>
        )}
        rowKey={(value) => value.id}
        columns={columns}
        dataSource={listSubject}
        pagination={{ position: ['bottomCenter'] }}
      />
    </div>
  );
}

export default Index;
