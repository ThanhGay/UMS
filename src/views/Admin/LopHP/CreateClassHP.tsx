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

import { apiCreateLhp } from '@/src/api/class';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  getDetailSubject,
  resetCurrentSubject
} from '@redux/features/subjectSlice';

function CreateClassHP() {
  const [form] = Form.useForm();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.subState.current);
  const { listSubject } = useAppSelector((state) => state.subState);

  const [loading, setLoading] = useState(false);

  const cancel = () => {
    setLoading(false);
    form.resetFields();
  };

  const handleChangeSubject = async (value: string) => {
    dispatch(getDetailSubject(value));
  };

  const handleBack = async () => {
    dispatch(resetCurrentSubject());
    router.back();
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const dataRes = await apiCreateLhp({
      className: values.className,
      maMonHoc: current.maMonHoc,
      tenMonHoc: current.tenMon,
      soTinChi: current.soTin,
      pricePerTinChi: values.pricePerTinChi,
      teacherIds: values.teacherIds
    });
    if (dataRes) {
      setLoading(false);
      handleBack();
    }
  };

  return (
    <div>
      <Button
        type="link"
        icon={<LeftOutlined />}
        style={{ color: 'black', fontSize: 16, paddingLeft: 0 }}
        onClick={handleBack}
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
          name="subjectId"
          label="Môn học"
          rules={[{ required: true, message: 'Vui lòng chọn môn' }]}
        >
          <Select
            placeholder="Bộ môn"
            onChange={handleChangeSubject}
            options={listSubject.map((item: any) => {
              return {
                value: item.maMonHoc,
                label: (
                  <div>
                    {item.maMonHoc} - {item.tenMon}
                  </div>
                )
              };
            })}
          />
        </Form.Item>

        <Form.Item
          name="teacherIds"
          label="Giảng viên"
          rules={[{ required: true, message: 'Vui lòng chọn giảng viên' }]}
        >
          <Select
            mode="multiple"
            placeholder="Giảng viên"
            options={current?.teacherDtos?.map((item: any) => {
              return {
                value: item.teacherId,
                label: item.tenGiangVien
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

export default CreateClassHP;
