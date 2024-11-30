'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Form, Input, Select, Typography } from 'antd';
import { CloseOutlined, LeftOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { createCtk } from '@redux/features/ctkSlice';
import { HieuSubjectModel } from '@models/Subject_Hieu';

function Index() {
  const dispatch = useAppDispatch();
  const { listSubject } = useAppSelector((state) => state.subState);
  const { data: listChuyenNganh } = useAppSelector(
    (state) => state.generalState.listChuyenNganh
  );

  const router = useRouter();
  const [form] = Form.useForm();
  const [listSubBk, setListSubBk] = useState<any[]>([]);
  const [selectedSubs, setSelectedSub] = useState<any[]>([]);

  useEffect(() => {
    const formattedSubjects = listSubject.map((item: HieuSubjectModel) => ({
      value: item.maMonHoc,
      label: `${item.maMonHoc} - ${item.tenMon}`
    }));
    setListSubBk(formattedSubjects);
  }, [listSubject]);

  const handleSubjectChange = (fieldName: number, value: number[]) => {
    const updatedFields = [...selectedSubs];
    updatedFields[fieldName] = value;
    setSelectedSub(updatedFields);
  };

  const handleAddSemester = (add: () => void) => {
    add();
    setSelectedSub((prev) => [...prev, []]);
  };

  const handleSubmit = async (values: any) => {
    const result = {
      chuyenNganhId: values.chuyenNganhId,
      details: values.details.map((detail: any, index: number) => ({
        kiHoc: detail.kiHoc,
        maMonHocs: selectedSubs[index] || []
      }))
    };

    const response = await dispatch(createCtk(result));
    console.log(response);

    if (response.meta.requestStatus === 'fulfilled') router.back();
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
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        form={form}
        name="dynamic_form_complex"
        style={{
          padding: 20,
          marginTop: 20,
          borderRadius: 12,
          backgroundColor: 'white'
        }}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Chuyên ngành"
          name="chuyenNganhId"
          rules={[{ required: true, message: 'Vui lòng chọn chuyên ngành' }]}
        >
          <Select
            placeholder="Chọn chuyên ngành cần tạo"
            options={listChuyenNganh.map((item: any) => {
              return {
                value: item.nganhId,
                label: item.tenNganh
              };
            })}
          />
        </Form.Item>

        <Form.List name="details">
          {(fields, { add, remove }) => (
            <div
              style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}
            >
              {fields.map((field, index) => (
                <Card
                  size="small"
                  title={`Học kì ${index + 1}`}
                  key={field.key}
                  extra={<CloseOutlined onClick={() => remove(field.name)} />}
                >
                  <Form.Item
                    label="Kì học"
                    name={[field.name, 'kiHoc']}
                    rules={[
                      {
                        required: true,
                        message:
                          'Vùi lòng nhập đúng định dạng "Kì 1, Kì 2, ..."'
                      }
                    ]}
                  >
                    <Input placeholder="Nhập kì học" />
                  </Form.Item>

                  <Form.Item
                    name={[field.name, 'maMonHocs']}
                    label="Môn"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn môn học'
                      }
                    ]}
                  >
                    <Select
                      placeholder="Chọn môn học"
                      mode="multiple"
                      options={listSubBk.filter(
                        (subject) =>
                          !selectedSubs.flat().includes(subject.value)
                      )}
                      allowClear
                      onChange={(value) => handleSubjectChange(index, value)}
                    />
                  </Form.Item>
                </Card>
              ))}

              <Button
                type="dashed"
                onClick={() => handleAddSemester(add)}
                block
              >
                + Thêm học kì
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item
          style={{ width: '120%', textAlign: 'center', marginTop: 24 }}
        >
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>

        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}

export default Index;
