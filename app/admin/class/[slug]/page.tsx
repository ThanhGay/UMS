'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Form } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { detailClass } from '@redux/features/classSlice';

function Index() {
  const { slug: id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.classState.current);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(detailClass(parseInt(id.toString())));
  }, [id]);

  console.log(data);

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
      <Form form={form}></Form>
    </div>
  );
}

export default Index;
