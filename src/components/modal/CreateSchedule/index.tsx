import { useEffect, useState } from 'react';
import { DatePicker, Form, Modal, ModalProps, Select } from 'antd';
import dayjs from 'dayjs';

import { useAppSelector } from '@redux/hooks';
import {
  apiCreateSchedule,
  apiGetTeacherIdInClass,
  apiGetTeacherInClass
} from '@/src/api/class';

const { RangePicker } = DatePicker;

function CreateSchedule(props: ModalProps) {
  const { open, onCancel } = props;
  const { listPhong } = useAppSelector((state) => state.generalState);
  const { data: listClass } = useAppSelector(
    (state) => state.classState.listClass
  );

  const [form] = Form.useForm();
  const [lopId, setLopId] = useState<number>(1);
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await apiGetTeacherIdInClass(lopId);

      if (res) {
        const dataRes = await apiGetTeacherInClass(res);
        if (dataRes) {
          setTeachers(dataRes.items);
        }
      }
    })();
  }, [lopId]);

  const handleSubmitForm = async (values: any) => {
    const bodyData = {
      lopHpId: values.lopHpId,
      teacherId: values.giangVien,
      roomId: values.phong,
      caHoc: values.caHoc,
      startAt: dayjs(values.range[0]).format('YYYY-MM-DD'),
      endAt: dayjs(values.range[1]).format('YYYY-MM-DD'),
      dayOfWeek: values.dayOfWeek
    };

    try {
      const dataRes = await apiCreateSchedule(bodyData);

      if (dataRes) {
        onCancel();
      }
    } catch (error: any) {
      alert(error.response.data);
    }
  };
  return (
    <Modal
      title="Tạo lịch biểu"
      open={open}
      okText="Tạo"
      cancelText="Hủy"
      onOk={() => {
        form.submit();
      }}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => handleSubmitForm(values)}
      >
        <Form.Item name={'lopHpId'} label="Lớp học phần">
          <Select
            value={lopId}
            onChange={(value) => setLopId(value)}
            placeholder="Lớp học phần"
            options={listClass?.map((lop: any) => {
              return {
                value: lop.id,
                label: lop.className + ' - ' + lop.tenMonHoc
              };
            })}
          />
        </Form.Item>
        <Form.Item name={'range'} label="Ngày bắt đầu - Ngày kết thúc">
          <RangePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name={'dayOfWeek'} label="Thứ">
          <Select
            placeholder="Thứ"
            options={[
              { value: 1, label: 'Thứ Hai' },
              { value: 2, label: 'Thứ Ba' },
              { value: 3, label: 'Thứ Tư' },
              { value: 4, label: 'Thứ Năm' },
              { value: 5, label: 'Thứ Sáu' },
              { value: 6, label: 'Thứ Bảy' },
              { value: 0, label: 'Chủ Nhật' }
            ]}
          />
        </Form.Item>
        <Form.Item name={'caHoc'} label="Ca học">
          <Select
            placeholder="Ca học"
            options={[
              { value: 1, label: 'Ca 1 - Tiết 1 - 3 (06:45 - 09:10)' },
              { value: 2, label: 'Ca 2 - TIết 4 - 6 (09:25 - 11:50)' },
              { value: 3, label: 'Ca 3 - TIết 7 - 9 (12:15 - 14:40)' },
              { value: 4, label: 'Ca 4 - TIết 10 - 12 (14:55 - 17:20)' },
              { value: 5, label: 'Ca 5 - TIết 13 - 15 (18:00 - 20:25)' }
            ]}
          />
        </Form.Item>
        <Form.Item name={'giangVien'} label="Giảng viên giảng dạy">
          <Select
            placeholder="Tên giảng viên"
            options={teachers.map((t: any) => {
              return {
                value: t.teacherId,
                label: t.teacherId + ' - ' + t.tenGiangVien
              };
            })}
          />
        </Form.Item>
        <Form.Item name={'phong'} label="Phòng">
          <Select
            virtual
            showSearch
            optionFilterProp="label"
            placeholder="Chọn phòng"
            options={listPhong.data?.map((item: any) => {
              return {
                value: item.id,
                label: item.name + '.' + item.building
              };
            })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateSchedule;
