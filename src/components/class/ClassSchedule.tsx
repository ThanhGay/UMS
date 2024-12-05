import React, { useState } from 'react';
import { Button, DatePicker, Empty, Form, Modal, Popover, Select } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { useAppSelector } from '@redux/hooks';
import { apiCreateSchedule } from '@/src/api/class';
import styles from './ManageClass.module.scss';

interface ClassData {
  id: number;
  lopHpId: number;
  roomName: string;
  caHoc: number;
  startAt: string;
  status: number;
}

interface GroupedData {
  [date: string]: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
}

// Hàm nhóm dữ liệu theo ngày và buổi học
const groupData = (data: ClassData[]): GroupedData => {
  const groupedData: GroupedData = {};
  data.forEach(({ startAt, lopHpId, roomName, caHoc, status }) => {
    const date = new Date(startAt).toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: 'numeric',
      month: 'numeric'
    });
    const timePeriod =
      caHoc <= 2 ? 'morning' : caHoc <= 4 ? 'afternoon' : 'evening';

    if (!groupedData[date]) {
      groupedData[date] = { morning: [], afternoon: [], evening: [] };
    }
    groupedData[date][timePeriod].push(
      `Phòng: ${roomName} - Ca: ${caHoc} ${status === 2 ? '- Tạm ngưng' : ''}`
    );
  });

  return groupedData;
};

const { RangePicker } = DatePicker;

interface ClassScheduleProps {}

const ClassSchedule: React.FC<ClassScheduleProps> = () => {
  const { data } = useAppSelector((state) => state.classState.current);
  const { listPhong } = useAppSelector((state) => state.generalState);
  const groupedData = groupData(data?.schedules);

  const [form] = Form.useForm();
  const [openAddSchedule, setOpenAddSchedule] = useState(false);
  const [openPostpone, setOpenPostpone] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    setOpenAddSchedule(false);
  };

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
        setOpenAddSchedule(false);
      }
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  return (
    <div>
      <div className="text-end">
        <Popover
          trigger={'hover'}
          content={
            <div className={styles.popoverContainer}>
              <div
                className={styles.item}
                onClick={() => setOpenAddSchedule(true)}
              >
                Thêm lịch
              </div>
              <div className={styles.item}>Chỉ định tạm ngưng</div>
            </div>
          }
        >
          <Button icon={<SettingOutlined />}>Điều chỉnh</Button>
        </Popover>
      </div>

      <div className={styles.tableSchedule}>
        {Object.entries(groupedData).length > 0 ? (
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th
                  style={{
                    border: '1px solid #ddd',
                    padding: '8px',
                    backgroundColor: '#f4f4f4'
                  }}
                >
                  Thứ
                </th>
                <th
                  style={{
                    border: '1px solid #ddd',
                    padding: '8px',
                    backgroundColor: '#f4f4f4'
                  }}
                >
                  Buổi sáng
                </th>
                <th
                  style={{
                    border: '1px solid #ddd',
                    padding: '8px',
                    backgroundColor: '#f4f4f4'
                  }}
                >
                  Buổi chiều
                </th>
                <th
                  style={{
                    border: '1px solid #ddd',
                    padding: '8px',
                    backgroundColor: '#f4f4f4'
                  }}
                >
                  Buổi tối
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedData).map(([date, periods]) => (
                <tr key={date}>
                  <td
                    style={{
                      border: '1px solid #ddd',
                      padding: '8px',
                      textAlign: 'center'
                    }}
                  >
                    {date}
                  </td>
                  <td
                    style={{
                      border: '1px solid #ddd',
                      padding: '8px',
                      backgroundColor: '#d1f7c4'
                    }}
                  >
                    {periods.morning.length > 0
                      ? periods.morning.join(', ')
                      : ''}
                  </td>
                  <td
                    style={{
                      border: '1px solid #ddd',
                      padding: '8px',
                      backgroundColor: '#c4e1f7'
                    }}
                  >
                    {periods.afternoon.length > 0
                      ? periods.afternoon.join(', ')
                      : ''}
                  </td>
                  <td
                    style={{
                      border: '1px solid #ddd',
                      padding: '8px',
                      backgroundColor: '#f7d1d1'
                    }}
                  >
                    {periods.evening.length > 0
                      ? periods.evening.join(', ')
                      : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Empty />
        )}
      </div>

      <Modal
        title="Tạo lịch biểu"
        open={openAddSchedule}
        okText="Tạo"
        cancelText="Hủy"
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            lopHpId: data?.id
          }}
          onFinish={(values) => handleSubmitForm(values)}
        >
          <Form.Item name={'lopHpId'} />
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
              options={data?.teacherInClass.map((t: any, idx: number) => {
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
    </div>
  );
};

export default ClassSchedule;
