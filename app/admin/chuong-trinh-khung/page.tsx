'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  Typography,
  Button,
  TableProps,
  Space,
  Tooltip,
  ConfigProvider
} from 'antd';
import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { deleteCtk, getListCtk } from '@redux/features/ctkSlice';

type DataType = {
  id: number;
  chuyenNganhId: number;
  tongTinChi: number;
  createAt: Date;
};

function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: listCtk, loading } = useAppSelector(
    (state) => state.ctkState.list
  );
  const { isDeleted, isCreated } = useAppSelector((state) => state.ctkState);

  useEffect(() => {
    dispatch(getListCtk());
  }, [isDeleted, isCreated]);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Chuyên ngành',
      dataIndex: 'chuyenNganhId',
      key: 'chuyenNganhId',
      align: 'center',
      render: (value) => <div className="text-start">{value}</div>
    },
    {
      title: 'Tổng số tín chỉ',
      dataIndex: 'tongTinChi',
      key: 'tongTinChi',
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
      align: 'center'
      //   render: (value) => <div>{dayjs(value).format('DD/MM/YYYY HH:mm')}</div>
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Tooltip title="Show">
            <Button
              className="show-btn"
              type="primary"
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                router.push(`chuong-trinh-khung/${record.id}`);
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
  const handleDelete = async (id: number) => {
    await dispatch(deleteCtk(id));
  };
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
              <Typography.Title level={3}>
                Quản lý chương trình khung
              </Typography.Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => router.push('chuong-trinh-khung/create')}
              >
                Tạo
              </Button>
            </div>
          )}
          rowKey={(value) => value.id}
          columns={columns}
          dataSource={listCtk}
          pagination={{ position: ['bottomCenter'], defaultPageSize: 10 }}
        />
      </ConfigProvider>
    </div>
  );
}

export default Index;
