import { useState } from 'react';
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { useAppSelector } from '@redux/hooks';
import { apiAddTeacherToClass } from '@/src/api/class';

function GeneralInformation() {
  const [messageAntd, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState('');

  const { data } = useAppSelector((state) => state.classState.current);
  const current = useAppSelector((state) => state.subState.current);

  const onChange = (value: string) => {
    setSelected(value);
  };

  const handleOk = async () => {
    try {
      const dataRes = await apiAddTeacherToClass({
        lopHpId: data?.id,
        teacherId: selected
      });

      if (dataRes) {
        messageAntd.success({ content: dataRes });
        setSelected('');
        setOpenModal(false);
      }
    } catch (e: any) {
      messageAntd.error({ content: e.response.data });
    }
  };

  return (
    <div className="relative">
      {contextHolder}
      <div className="absolute top-0 right-0">
        <Button
          style={{ zIndex: 10 }}
          icon={<PlusCircleOutlined />}
          onClick={() => setOpenModal(true)}
        >
          Thêm giảng viên
        </Button>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              colorTextDisabled: 'black'
            }
          }
        }}
      >
        <Form
          labelCol={{ span: 4, className: 'font-semibold' }}
          disabled
          layout="inline"
          style={{ flexDirection: 'column' }}
          form={form}
          initialValues={{
            classHp: data?.className,
            monHoc: data?.maMonHoc + ' - ' + data?.tenMonHoc,
            soTC: data?.soTinChi,
            totalLessons: data?.totalLesson,
            numSV: data?.realityStudent + '/' + data?.totalStudents
          }}
        >
          <Form.Item name="classHp" label="Tên lớp">
            <Input variant="borderless" placeholder="Tên lớp" />
          </Form.Item>
          <Form.Item name="monHoc" label="Môn học">
            <Input variant="borderless" placeholder="Mã học phần" />
          </Form.Item>
          <Form.Item name="soTC" label="Số TC">
            <Input variant="borderless" placeholder="Số tín chỉ" />
          </Form.Item>
          <Form.Item name="totalLessons" label="Tổng số tiết">
            <Input variant="borderless" placeholder="Tổng số tiết" />
          </Form.Item>
          <Form.Item name="numSV" label="Số lượng sinh viên">
            <Input
              variant="borderless"
              placeholder="Số lượng sinh viên trong lớp"
            />
          </Form.Item>
          <Form.Item name="teacher" label="Giảng viên">
            <Space direction="horizontal">
              {data?.teacherInClass.map((teacher: any, idx: number) => (
                <Col key={idx}>{teacher.tenGiangVien},</Col>
              ))}
            </Space>
          </Form.Item>
        </Form>

        <Modal
          title="Thêm giảng viên vào lớp"
          open={openModal}
          onCancel={() => setOpenModal(false)}
          onOk={handleOk}
        >
          <Space direction="vertical" className="w-full">
            <label htmlFor="dsTeacherBoMon">
              Danh sách giảng viên dạy môn {data?.tenMonHoc}
            </label>
            <Select
              id="dsTeacherBoMon"
              style={{ width: '100%' }}
              options={current?.teacherDtos?.map((item: any) => {
                return {
                  value: item.teacherId,
                  label: item.tenGiangVien
                };
              })}
              onChange={onChange}
            />
          </Space>
        </Modal>
      </ConfigProvider>
    </div>
  );
}

export default GeneralInformation;
