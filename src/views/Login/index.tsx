'use client';

import { useRouter } from 'next/navigation';
import { Button, Form, Input, notification, Typography } from 'antd';

import { apiLogin, apiLoginWithOTP } from '@/src/api/auth';
import { useAppDispatch } from '@redux/hooks';
import { setDataUser } from '@redux/features/authSlice';
import { useState } from 'react';

type FormValueType = {
  email: string;
  password: string;
};

function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [otpForm, setOtpForm] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');

  const [form] = Form.useForm();
  const [notificationApi, contextHolder] = notification.useNotification();

  const submitOTP = async (value: any) => {
    try {
      const res = await apiLoginWithOTP({
        email: emailAddress,
        otp: value.otp
      });

      if (res) {
        dispatch(setDataUser(res));
        notificationApi.success({
          message: 'Success',
          description: 'Login success!'
        });
        router.push('/home');
      } else {
        notificationApi.error({
          message: 'Error',
          description: 'Wrong OTP!'
        });
      }
    } catch (error: any) {
      notificationApi.error({
        message: 'Opps!',
        description: error.response.data
      });
    }
  };

  return (
    <div style={{ width: '50%', textAlign: 'center' }}>
      {contextHolder}
      {otpForm ? (
        <div>
          <Typography.Title level={3}>Verify OTP</Typography.Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => submitOTP(values)}
          >
            <Form.Item name="otp">
              <Input.OTP size="large" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Verify
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <DefaultLoginForm
          notificationApi={notificationApi}
          onChange={(email) => setEmailAddress(email)}
          onOk={() => setOtpForm(true)}
        />
      )}
    </div>
  );
}

const DefaultLoginForm = ({
  notificationApi,
  onOk,
  onChange
}: {
  notificationApi: any;
  onOk: () => void;
  onChange: (email: string) => void;
}) => {
  const [form] = Form.useForm();
  const handleSubmit = async (formValues: FormValueType) => {
    try {
      const dataRes = await apiLogin(formValues);
      console.log(dataRes);
      if (dataRes === 'Sinh OTP thành công') {
        notificationApi.success({
          message: 'One more step',
          description: 'Please enter the OTP had sent to your email'
        });
        onOk();
      } else {
        notificationApi.error({
          message: 'Response',
          description: 'Bạn đã nhập sai tài khoản hoặc mật khẩu!'
        });
      }
      // if (dataRes.status) {
      //     // dispatch(setDataUser(dataRes.data));
      //     notificationApi.success({
      //         message: "Response",
      //         description: "Bạn đã đăng nhập thành công!",
      //     });

      //     router.push("/home");
      // } else {
      //     notificationApi.error({
      //         message: "Response",
      //         description: "Bạn đã nhập sai tài khoản hoặc mật khẩu!",
      //     });
      // }
    } catch (error: any) {
      notificationApi.error({
        message: 'Opps!',
        description: error.response.data
      });
    }
  };

  return (
    <div>
      <Typography.Title level={3}>Đăng nhập</Typography.Title>
      <Form
        form={form}
        autoComplete="false"
        layout="vertical"
        onFinish={(values) => handleSubmit(values)}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              whitespace: true,
              message: 'Email is required!'
            }
          ]}
        >
          <Input
            type="email"
            size="large"
            placeholder="Email"
            onChange={(e) => onChange(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Password is required!'
            },
            { min: 6, message: 'Password must 6 characters!' }
          ]}
        >
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
