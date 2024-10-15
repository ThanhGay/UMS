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

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { detailClass, getListClass } from '@redux/features/classSlice';

type DataType = {
  id: number;
  className: string;
  maHocPhan: string;
  subjectName: string;
  teacherId: number;
  soTinChi: number;
  pricePerTinChi: number;
  totalLesson: number;
};

function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: listClass, loading } = useAppSelector(
    (state) => state.classState.listClass
  );
  const { isCreated, isDeleted } = useAppSelector((state) => state.classState);

  useEffect(() => {
    dispatch(getListClass());
  }, [dispatch, isDeleted, isCreated]);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Tên lớp',
      dataIndex: 'className',
      key: 'className',
      align: 'center',
      render: (value) => <div className="text-start">{value}</div>
    },
    {
      title: 'Mã học phần',
      dataIndex: 'maHocPhan',
      key: 'maHocPhan',
      align: 'center'
    },
    {
      title: 'Môn học',
      dataIndex: 'subjectName',
      key: 'subjectName',
      align: 'center'
    },
    {
      title: 'Giảng viên',
      dataIndex: 'teacherId',
      key: 'teacherId',
      align: 'center'
    },
    {
      title: 'Số tín chỉ',
      dataIndex: 'soTinChi',
      key: 'soTinChi',
      align: 'center'
    },
    {
      title: 'Số buổi học',
      dataIndex: 'totalLesson',
      key: 'totalLesson',
      align: 'center'
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
                dispatch(detailClass(record.id));
                router.push(`class/${record.id}`);
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

  const handleDelete = async (lhpId: number) => {
    console.log('deleted:', lhpId);

    // await dispatch(deleteClass(lhpId));
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
                Quản lý lớp học phần
              </Typography.Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => router.push('class/create')}
              >
                Tạo
              </Button>
            </div>
          )}
          rowKey={(value) => value.id}
          columns={columns}
          dataSource={listClass}
          pagination={{ position: ['bottomCenter'], defaultPageSize: 10 }}
        />
      </ConfigProvider>
    </div>
  );
}

export default Index;
