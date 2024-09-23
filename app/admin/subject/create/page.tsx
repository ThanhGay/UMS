'use client';

import { useRouter } from 'next/navigation';
import { Button, Form, Input, InputNumber, Space, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { Subject } from '@models/index';
import { apiCreateSubject } from '@/src/api/subject';

function Index() {
  const [form] = Form.useForm();
  const router = useRouter();

  const cancel = () => {
    form.resetFields();
  };

  const handleSubmit = async (values: Subject) => {
    const frmData = {
      maHocPhan: values.maHocPhan,
      name: values.name,
      soTinChi: values.soTinChi
    };

    const dataRes = await apiCreateSubject(frmData);
    if (dataRes.status) router.back();
  };

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
        style={{
          padding: 20,
          marginTop: 20,
          borderRadius: 12,
          backgroundColor: 'white'
        }}
        onFinish={(values) => handleSubmit(values)}
      >
        <Typography.Title level={3}>Tạo thêm môn học</Typography.Title>

        <Form.Item name="maHocPhan" label="Mã học phần" required>
          <Input placeholder="Mã học phần" />
        </Form.Item>
        <Form.Item name="name" label="Tên môn học" required>
          <Input placeholder="Tên môn học" />
        </Form.Item>
        <Form.Item name="soTinChi" label="Số tín chỉ" required>
          <InputNumber placeholder="Số tín chỉ" max={3} min={1} />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Space size="large">
            <Button type="primary" htmlType="submit">
              Tạo mới
            </Button>
            <Button onClick={cancel}>Làm lại</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Index;
