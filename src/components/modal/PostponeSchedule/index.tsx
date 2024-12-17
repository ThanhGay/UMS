'use client';

import { Button, Col, Modal, Row } from 'antd';
import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { apiPostPoneSchedule } from '@/src/api/schedule';
import { setPostpone } from '@redux/features/schedule';
import './style.scss';

function PostponeSchedule({
  open,
  onCancel,
  message
}: {
  open: boolean;
  onCancel: () => void;
  message: any;
}) {
  const dispatch = useAppDispatch();
  // const { open, onCancel } = props;

  const { data: listTeacher } = useAppSelector(
    (state) => state.generalState.listTeacher
  );
  const scheduleItem = useAppSelector((state) => state.scheduleState.current);

  const teacherName = listTeacher.filter(
    (item: any) => item.teacherId === scheduleItem?.teacherId
  )[0]?.tenGiangVien;

  let _time = '',
    _tiet = '';
  switch (scheduleItem?.caHoc) {
    case 1:
      _tiet = '1 - 3';
      _time = '06:45 - 09:10';
      break;
    case 2:
      _tiet = '4 - 6';
      _time = '09:25 - 11:50';
      break;
    case 3:
      _tiet = '7 - 9';
      _time = '12:15 - 14:40';
      break;
    case 4:
      _tiet = '10 - 12';
      _time = '14:55 - 17:20';
      break;
    case 5:
      _tiet = '13 - 15';
      _time = '18:00 - 20:25';
      break;
  }

  const handleOk = () => {
    Modal.confirm({
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const dataRes = await apiPostPoneSchedule(scheduleItem?.scheduleId);
          if (dataRes) {
            dispatch(setPostpone(scheduleItem?.scheduleId));
            onCancel();
          }
        } catch (error: any) {
          message.error(error.response.data);
        }
      },
      title: 'Bạn chắc chắn muốn cho buổi học này nghỉ?'
    });
  };

  return (
    <Modal open={open} onCancel={onCancel} footer={null} title="Chi tiết">
      <div className="flex flex-col gap-2 p-4 relative">
        <Row gutter={[8, 16]}>
          <Col span={8}>Lớp:</Col>
          <span className="text-base">
            {scheduleItem?.className} - {scheduleItem?.subjectName}
          </span>
        </Row>
        <Row gutter={[8, 16]}>
          <Col span={8}>Tiết:</Col>
          <span className="text-base">{_tiet}</span>
        </Row>
        <Row gutter={[8, 16]}>
          <Col span={8}>Giờ:</Col>
          <span className="text-base">{_time}</span>
        </Row>
        <Row gutter={[8, 16]}>
          <Col span={8}>Ngày:</Col>
          <span className="text-base">
            {dayjs(scheduleItem?.startAt).format('DD/MM/YYYY')}
          </span>
        </Row>

        <Row gutter={[8, 16]}>
          <Col span={8}>Giảng viên:</Col>
          <span className="text-base">
            {scheduleItem?.teacherId} - {teacherName}
          </span>
        </Row>

        {scheduleItem?.status === 2 && (
          <div className="tamngung">
            <span>Tạm ngưng</span>
          </div>
        )}
      </div>

      <div className="text-end flex gap-4 mt-8">
        <Button
          type="primary"
          onClick={handleOk}
          disabled={scheduleItem?.status === 2}
        >
          Tạm ngưng
        </Button>
        <Button onClick={onCancel}>Đóng</Button>
      </div>
    </Modal>
  );
}

export default PostponeSchedule;
