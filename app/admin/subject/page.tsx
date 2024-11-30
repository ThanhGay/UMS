'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, ConfigProvider, Table, TableProps, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { HieuSubjectModel } from '@models/Subject_Hieu';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getListSubject } from '@redux/features/subjectSlice';

function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { listSubject, loading, isDeleted } = useAppSelector(
    (state) => state.subState
  );

  useEffect(() => {
    dispatch(getListSubject());
  }, [dispatch, isDeleted]);

  const columns: TableProps<HieuSubjectModel>['columns'] = [
    {
      title: 'Mã môn học',
      dataIndex: 'maMonHoc',
      key: 'maHocPhan',
      align: 'center',
      width: '20%',
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
      width: '15%'
    },
    {
      title: 'Bộ môn',
      dataIndex: 'boMonId',
      key: 'boMonId',
      align: 'center',
      width: '15%'
    }
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
            <Typography.Title level={3}>Danh sách môn học</Typography.Title>

            {/* Tạo môn học */}
            {/* <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => router.push('/admin/subject/create')}
            >
              Tạo
            </Button> */}
          </div>
        )}
        rowKey={(value) => value.maMonHoc}
        columns={columns}
        dataSource={listSubject}
        pagination={{ position: ['bottomCenter'], defaultPageSize: 10 }}
        // scroll={{ y: 65 * 10 }}
      />
    </ConfigProvider>
  );
}

export default Index;
