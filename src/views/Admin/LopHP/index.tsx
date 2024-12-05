'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  Typography,
  Button,
  TableProps,
  Space,
  Tooltip,
  ConfigProvider,
  Modal,
  message
} from 'antd';
import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  deleteClass,
  detailClass,
  getListClass
} from '@redux/features/classSlice';

type DataType = {
  id: number;
  className: string;
  maMonHoc: string;
  tenMonHoc: string;
  teacherId: number;
  soTinChi: number;
  pricePerTinChi: number;
  totalLesson: number;
};

function AdminManageClassHP() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: listClass, loading } = useAppSelector(
    (state) => state.classState.listClass
  );
  const { isCreated, isDeleted } = useAppSelector((state) => state.classState);

  const [id, setId] = useState<number>(-1);
  const [openModal, setOpenModal] = useState(false);

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
      dataIndex: 'maMonHoc',
      key: 'maMonHoc',
      align: 'center'
    },
    {
      title: 'Môn học',
      dataIndex: 'tenMonHoc',
      key: 'tenMonHoc',
      align: 'center'
    },
    {
      title: 'Giảng viên',
      dataIndex: 'teacherIds',
      key: 'teacherIds',
      align: 'center',
      render: (value) => {
        return (
          <div className="flex gap-1">
            {value.map((id: any, idx: number) => (
              <p key={idx}>{id},</p>
            ))}
          </div>
        );
      }
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
              onClick={() => {
                setId(record.id);
                setOpenModal(true);
              }}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const handleDelete = async (lhpId: number) => {
    const res = await dispatch(deleteClass(lhpId));
    if (res) {
      message.success(res.payload);
      setOpenModal(false);
    }
  };

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
            <Typography.Title level={3}>Quản lý lớp học phần</Typography.Title>
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

      <Modal
        title="Bạn chắc chắn muốn xóa lớp học phần này?"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
        onOk={() => handleDelete(id)}
      >
        <br />
      </Modal>
    </ConfigProvider>
  );
}

export default AdminManageClassHP;
