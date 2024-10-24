'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Empty, Form, Input } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { detailClass } from '@redux/features/classSlice';

function Index() {
  const { slug: id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.classState.current);
  const [form] = Form.useForm();

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
      <div>
        {data ? (
          <div>
            {data.map((item: any) => (
              <div>
                {data?.roomId} - {data?.caHoc} -{' '}
                {dayjs(data?.startAt).format('DD/MM/YYYY')}
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}

export default Index;
