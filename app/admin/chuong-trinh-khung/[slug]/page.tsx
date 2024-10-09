'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Form, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getDetailCtk } from '@redux/features/ctkSlice';

function Index() {
  const { slug: id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    data: detailCtk,
    loading,
    error
  } = useAppSelector((state) => state.ctkState.current);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getDetailCtk(parseInt(id.toString())));
  }, [id]);

  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  console.log(detailCtk);

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
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        onFinish={(values) => handleSubmit(values)}
        style={{
          padding: 20,
          marginTop: 20,
          borderRadius: 12,
          backgroundColor: 'white'
        }}
      >
        <Typography.Title level={3}>
          Chi tiết chương trình khung
        </Typography.Title>
      </Form>
    </div>
  );
}

export default Index;
