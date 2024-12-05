'use client';

import { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { useAppSelector } from '@redux/hooks';
import {
  apiGetScheduleOfStudent,
  apiGetScheduleOfTeacher
} from '@/src/api/schedule';

import style from './styles.module.scss';

interface ScheduleData {
  scheduleId: number;
  lopHpId: number;
  className: string;
  maMonHoc: string;
  subjectName: string;
  roomName: string;
  caHoc: number;
  startAt: string;
  status: number;
}
const daysOfWeek = [
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
  'Chủ nhật'
];

function WeeklySchedule() {
  const { user } = useAppSelector((state) => state.authState);
  const [messageAntd, contextHolder] = message.useMessage();

  const [listSchedule, setListSchedule] = useState<ScheduleData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const dataRes = await apiGetScheduleOfTeacher(user?.teacherId);
        if (dataRes) {
          setListSchedule(dataRes);
        }
      } catch (error: any) {
        messageAntd.error(error.response.data);
      }
    })();
  }, [user]);

  const [currentWeek, setCurrentWeek] = useState<Date>(new Date()); // Tuần bắt đầu

  // Hàm tính ngày bắt đầu của tuần hiện tại
  const getStartOfWeek = (date: Date): Date => {
    const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1; // Chủ nhật là ngày cuối
    const start = new Date(date);
    start.setDate(date.getDate() - dayIndex);
    return start;
  };

  // Hàm chuyển đổi tuần
  const changeWeek = (direction: 'next' | 'prev') => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newWeek);
  };

  const renderCalendar = () => {
    const startOfWeek = getStartOfWeek(currentWeek);

    return daysOfWeek.map((day, index) => {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + index);

      // Lọc sự kiện theo ngày
      const events = listSchedule.filter((schedule) => {
        const scheduleDate = new Date(schedule.startAt);
        return (
          scheduleDate.getFullYear() === currentDate.getFullYear() &&
          scheduleDate.getMonth() === currentDate.getMonth() &&
          scheduleDate.getDate() === currentDate.getDate()
        );
      });

      return (
        <div key={index} className={style.day}>
          <strong>{day}</strong>
          <div className={style.date}>
            {dayjs(currentDate).format('DD/MM/YYYY')}
          </div>
          {events.map((event) => (
            <div key={event.scheduleId} className={style.event}>
              <div>{event.subjectName}</div>
              <div>Phòng: {event.roomName}</div>
              <div>Ca: {event.caHoc}</div>
            </div>
          ))}
        </div>
      );
    });
  };

  return (
    <>
      {contextHolder}
      <div>
        <div className={style.weekControls}>
          <Button
            type="primary"
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={() => changeWeek('prev')}
          >
            Tuần trước
          </Button>
          <p className="text-base">
            <span className="pr-1">Ngày bắt đầu:</span>
            <span className="font-semibold">
              {dayjs(getStartOfWeek(currentWeek)).format('DD/MM/YYYY')}
            </span>
          </p>
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={() => changeWeek('next')}
          >
            Tuần tiếp
          </Button>
        </div>
        <div className={style.calendar}>{renderCalendar()}</div>
      </div>
    </>
  );
}

export default WeeklySchedule;
