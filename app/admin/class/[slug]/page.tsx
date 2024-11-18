'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Empty, Form, Input, Tabs, Typography } from 'antd';
import type { TabsProps } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { detailClass } from '@redux/features/classSlice';
import GeneralInformation from '@components/class/GeneralInformation';

function Index() {
  const { slug: id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.classState.current);
  const [form] = Form.useForm();

  console.log(data);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Thông tin chung',
      children: <GeneralInformation data={data} />
    },
    {
      key: '2',
      label: 'Danh sách sinh viên',
      children: 'Content of Tab Pane 2'
    },
    {
      key: '3',
      label: 'Lịch tổng quan',
      children: 'Content of Tab Pane 3'
    }
  ];

  return (
    <div>
      <Button
        type="link"
        icon={<LeftOutlined />}
        style={{ color: 'black', fontSize: 16, paddingLeft: 0 }}
        onClick={() => router.back()}
      >
        Quay lại
      </Button>
      <div className="bg-white rounded-xl p-5 mt-5">
        <Typography.Title level={3}>
          Chi tiết lớp học phần
        </Typography.Title>
        <Tabs items={items}  />
      </div>
    </div>
  );
}

export default Index;
