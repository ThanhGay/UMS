'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Form, Input, InputNumber, Space, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { Subject } from '@models/index';
import { formatDate } from '@utils/index';
import { apiGetDetailSubject, apiUpdateSubject } from '@/src/api/subject';

function Index() {
  const { slug: id } = useParams();
  const router = useRouter();

  const [form] = Form.useForm();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const dataRes = await apiGetDetailSubject(id);
      if (dataRes.status) {
        setSubject(dataRes.data);
        form.setFieldsValue(dataRes.data);
      }
    })();

    return () => {
      setReload(false);
    };
  }, [id, reload]);

  const handleSubmit = async (values: Subject) => {
    const frmData = {
      id: values.id,
      maHocPhan: values.maHocPhan,
      name: values.name,
      soTinChi: values.soTinChi
    };
    const dataRes = await apiUpdateSubject(frmData);
    if (dataRes.status) setReload(true);
  };

  const cancel = () => {
    form.setFieldsValue(subject);
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
        onFinish={(values) => handleSubmit(values)}
        style={{
          padding: 20,
          marginTop: 20,
          borderRadius: 12,
          backgroundColor: 'white'
        }}
      >
        <Typography.Title level={3}>
          Cập nhật thông tin môn học
        </Typography.Title>

        <Form.Item name="id" label="Id">
          <Input
            placeholder="Id"
            disabled
            style={{ backgroundColor: 'white', color: 'black' }}
          />
        </Form.Item>
        <Form.Item name="maHocPhan" label="Mã học phần" required>
          <Input placeholder="Mã học phần" />
        </Form.Item>
        <Form.Item name="name" label="Tên môn học" required>
          <Input placeholder="Tên môn học" />
        </Form.Item>
        <Form.Item name="soTinChi" label="Số tín chỉ" required>
          <InputNumber placeholder="Số tín chỉ" max={3} min={1} />
        </Form.Item>
        <Form.Item label="Lần cuối cập nhật">
          <Input
            placeholder="Ngày cập nhật gần nhất"
            value={formatDate(subject?.updateAt)}
            disabled
            style={{ backgroundColor: 'white', color: 'black' }}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Space size="large">
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
            <Button onClick={cancel}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Index;