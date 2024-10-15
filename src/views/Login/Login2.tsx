'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, notification, Select, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  authLoginAdmin,
  authLoginStudent,
  authLoginTeacher
} from '@redux/features/authSlice';

function LoginPage2() {
  const { loginCode, loading, user_type } = useAppSelector(
    (state) => state.authState
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const [notificationApi, contextHolder] = notification.useNotification();

  // loading directing
  const [directing, setDirecting] = useState(false);

  const handleSubmit = async (values: any) => {
    if (values.role === 1) {
      dispatch(
        authLoginStudent({ email: values.email, password: values.password })
      );
    } else if (values.role === 2) {
      dispatch(
        authLoginTeacher({ email: values.email, password: values.password })
      );
    } else if (values.role === 3) {
      dispatch(
        authLoginAdmin({ email: values.email, password: values.password })
      );
    }
  };

  useEffect(() => {
    if (loginCode) {
      if (loginCode === 0) {
        notificationApi.error({ message: 'Đăng nhập', description: 'error' });
      } else {
        notificationApi.success({
          message: 'Đăng nhập',
          description: 'Thành công'
        });
        setDirecting(true);
      }

      switch (user_type) {
        case 'student':
          router.push('/home');
          break;
        case 'teacher':
          break;
        case 'admin':
          router.push('/admin');
          break;
        default:
          break;
      }
    }
  }, [loading]);

  return (
    <>
      {directing ? (
        <div className="h-fit w-full">
          <Spin size="large" />
        </div>
      ) : (
        <div>
          {contextHolder}
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={(values) => handleSubmit(values)}
            style={{ width: 500 }}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message:
                    'Email không được để trống, không chứa khoảng trắng ở hai đầu'
                }
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Password không được để trống'
                }
              ]}
            >
              <Input placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="role"
              label="Chọn quyền"
              rules={[
                { required: true, message: 'Vui lòng chọn quyền đăng nhập' }
              ]}
            >
              <Select
                placeholder="Chọn quyền"
                options={[
                  { value: 1, label: 'Sinh viên' },
                  { value: 2, label: 'Giảng viên' },
                  { value: 3, label: 'Quản lý' }
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
}

export default LoginPage2;
