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

import { Subject } from '@models/index';
import { apiCreateSubject } from '@/src/api/subject';
import { useAppSelector } from '@redux/hooks';

function Index() {
  const [form] = Form.useForm();
  const router = useRouter();

  const { token } = useAppSelector((state) => state.authState);

  const [loading, setLoading] = useState(false);

  const { data: listBoMon } = useAppSelector(
    (state) => state.generalState.listBoMon
  );

  const cancel = () => {
    setLoading(false);
    form.resetFields();
  };

  const handleSubmit = async (values: Subject) => {
    setLoading(true);
    const frmData = {
      maMonHoc: values.maHocPhan,
      tenMon: values.name,
      sotin: values.soTinChi,
      boMonId: values.boMonId
    };

    const dataRes = await apiCreateSubject(frmData, token);

    if (dataRes) {
      router.back();
      setLoading(false);
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
        <Typography.Title level={3}>Tạo thêm môn học</Typography.Title>

        <Form.Item
          name="maHocPhan"
          label="Mã học phần"
          rules={[
            { required: true, message: 'Mã học phần không được để trống' }
          ]}
        >
          <Input placeholder="Mã học phần" />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên môn học"
          rules={[
            { required: true, message: 'Tên môn học không được để trống' }
          ]}
        >
          <Input placeholder="Tên môn học" />
        </Form.Item>
        <Form.Item
          name="soTinChi"
          label="Số tín chỉ"
          rules={[{ required: true, message: 'Số tìn chỉ phải từ 1 đến 3' }]}
        >
          <InputNumber placeholder="Số tín chỉ" max={3} min={1} />
        </Form.Item>
        <Form.Item
          name="boMonId"
          label="Bộ môn"
          // rules={[{ required: true, message: 'Vui lòng chọn bộ môn' }]}
        >
          <Select
            placeholder="Bộ môn"
            options={listBoMon.map((item: any) => {
              return {
                value: item.boMonId,
                label: item.tenBoMon
              };
            })}
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
