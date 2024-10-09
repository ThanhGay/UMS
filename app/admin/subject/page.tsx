'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  ConfigProvider,
  Space,
  Table,
  TableProps,
  Tooltip,
  Typography
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { SubjectModel } from '@models/Subject';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { deleteSubject, getListSubject } from '@redux/features/subjectSlice';

function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { listSubject, loading, isDeleted } = useAppSelector(
    (state) => state.subState
  );
  useEffect(() => {
    dispatch(getListSubject());
  }, [isDeleted]);

  const handleDelete = async (id: number) => {
    await dispatch(deleteSubject(id));
  };

  const columns: TableProps<SubjectModel>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
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
      render: (value) => <div>{dayjs(value).format('DD/MM/YYYY HH:mm')}</div>
    },
    {
      title: 'Cập nhật',
      dataIndex: 'updateAt',
      key: 'updateAt',
      align: 'center',
      render: (value) => <div>{dayjs(value).format('DD/MM/YYYY HH:mm')}</div>
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              className="edit-btn"
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                router.push(`subject/edit/${record.id}`);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              className="delete-btn"
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      )
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
          loading={loading}
          title={() => (
            <div className="flex items-center justify-between">
              <Typography.Title level={3}>Quản lý môn học</Typography.Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => router.push('/admin/subject/create')}
              >
                Tạo
              </Button>
            </div>
          )}
          rowKey={(value) => value.id}
          columns={columns}
          dataSource={listSubject}
          pagination={{ position: ['bottomCenter'], defaultPageSize: 10 }}
        />
      </ConfigProvider>
    </div>
  );
}

export default Index;
