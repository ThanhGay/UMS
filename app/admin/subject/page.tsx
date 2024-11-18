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
import { HieuSubjectModel } from '@models/Subject_Hieu';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  deleteSubject,
  getDetailSubject,
  getListSubject
} from '@redux/features/subjectSlice';

function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { listSubject, loading, isDeleted } = useAppSelector(
    (state) => state.subState
  );
  useEffect(() => {
    dispatch(getListSubject());
  }, [dispatch, isDeleted]);

  const handleDelete = async (id: number) => {
    await dispatch(deleteSubject(id));
  };

  const columns: TableProps<HieuSubjectModel>['columns'] = [
    
    {
      title: 'Mã học phần',
      dataIndex: 'maMonHoc',
      key: 'maHocPhan',
      align: 'center',
      width: '15%',
      render: (value) => <div className="text-start">{value}</div>
    },
    {
      title: 'Tên môn học',
      dataIndex: 'tenMon',
      key: 'name',
      align: 'center',
      render: (value) => <div className="text-start">{value}</div>
    },
    {
      title: 'Số tín chỉ',
      dataIndex: 'soTin',
      key: 'soTinChi',
      align: 'center',
      width: '10%'
    },
    {
      title: 'Bộ môn',
      dataIndex: 'boMonId',
      key: 'boMonId',
      align: 'center',
      width: '10%'
    },
    
  ];

  return (
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
        rowKey={(value) => value.maMonHoc}
        columns={columns}
        dataSource={listSubject}
        pagination={{ position: ['bottomCenter'], defaultPageSize: 10 }}
        scroll={{ y: 65 * 10 }}
      />
    </ConfigProvider>
  );
}

export default Index;
