'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Typography
} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useAppSelector } from '@redux/hooks';
import { apiCreateLhp } from '@/src/api/class';

function Index() {
  const [form] = Form.useForm();
  const router = useRouter();

  const { listSubject } = useAppSelector((state) => state.subState);
  const { data: listTeachers } = useAppSelector(
    (state) => state.generalState.listTeacher
  );

  const [loading, setLoading] = useState(false);

  const cancel = () => {
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const dataRes = await apiCreateLhp(values);
    if (dataRes) {
      setLoading(false);
      router.back();
    }
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
        <Typography.Title level={3}>Tạo lớp học phần</Typography.Title>

        <Form.Item name="className" label="Tên lớp">
          <Input placeholder="Tên lớp học" />
        </Form.Item>
        <Form.Item
          name="teacherId"
          label="Giảng viên"
          rules={[{ required: true, message: 'Vui lòng chọn giảng viên' }]}
        >
          <Select
            // mode="multiple"
            placeholder="Giảng viên"
            options={listTeachers.map((item: any) => {
              return {
                value: item.teacherId,
                label: item.tenGiangVien
              };
            })}
          />
        </Form.Item>

        <Form.Item
          name="subjectId"
          label="Môn học"
          rules={[{ required: true, message: 'Vui lòng chọn môn' }]}
        >
          <Select
            placeholder="Bộ môn"
            options={listSubject.map((item: any) => {
              return {
                value: item.id,
                label: (
                  <div>
                    {item.maHocPhan} - {item.name}
                  </div>
                )
              };
            })}
          />
        </Form.Item>
        <Form.Item name="pricePerTinChi" label="Số tiền/tín">
          <InputNumber
            style={{ width: '100%' }}
            min={1}
            placeholder="Số tiền/tín chỉ"
          />
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Space size="large">
            <Button type="primary" htmlType="submit" loading={loading}>
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
