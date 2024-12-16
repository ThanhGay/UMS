'use client';

import React, { useState } from 'react';
import { Button, Select } from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PlusOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getAllSchedule, setCurrentSchedule } from '@redux/features/schedule';

import { ModalCreateSchedule, ModalPostponeSchedule } from '@components/modal';
import style from './style.module.scss';

const daysOfWeek = [
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
  'Chủ nhật'
];

const listCaHoc = [
  {
    value: 1,
    name: 'Ca 1',
    range: '1 - 3',
    time: '06:45 - 09:10',
    bgColor: '#99ccff',
    color: '#000'
  },
  {
    value: 2,
    name: 'Ca 2',
    range: '4 - 6',
    time: '09:25 - 11:50',
    bgColor: '#ffff00',
    color: '#000'
  },
  {
    value: 3,
    name: 'Ca 3',
    range: '7 - 9',
    time: '12:15 - 14:40',
    bgColor: '#ff4d4d',
    color: '#000'
  },
  {
    value: 4,
    name: 'Ca 4',
    range: '10 - 12',
    time: '14:55 - 17:20',
    bgColor: '#990033',
    color: '#fff'
  },
  {
    value: 5,
    name: 'Ca 5',
    range: '13 - 15',
    time: '18:00 - 20:25',
    bgColor: '#660066',
    color: '#fff'
  }
];

const AdminSchedule: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: _listSchedule } = useAppSelector(
    (state) => state.scheduleState
  ).list;
  const { data: listTeacher } = useAppSelector(
    (state) => state.generalState.listTeacher
  );
  const { data } = useAppSelector((state) => state.generalState.listPhong);

  const [listRoom, setListRoom] = useState([]);
  const [listSchedule, setListSchedule] = useState<any[]>([]);
  const [listScheduleFilter, setListScheduleFilter] = useState<any[]>([]);
  const [openPopup, setOpenPopup] = useState(false); // pop-up view detail schedule
  const [openModalCreate, setOpenModalCreate] = useState(false); // pop-up create schedule

  const onChangeBuilding = async (itemSelected: any) => {
    // set danh sách phòng tương ứng với tòa nhà đã chọn
    setListRoom(
      data.filter((item: any) => item.building === itemSelected.value)
    );

    // call api lấy danh sách các buổi học tương ứng với tòa nhà
    const dataRes = await dispatch(
      getAllSchedule({
        page: 1,
        limit: 100,
        building: itemSelected.value,
        caHoc: -1
      })
    );

    if (dataRes.meta.requestStatus === 'fulfilled') {
      setListSchedule(dataRes.payload?.items);
      setListScheduleFilter(dataRes.payload?.items);
    }
  };

  const onChangeTeacher = async (selected: any) => {
    setListScheduleFilter(
      listSchedule.filter((item) => item.teacherId === selected)
    );
  };

  const [currentWeek, setCurrentWeek] = useState(new Date());

  const getStartOfWeek = (date: Date): Date => {
    const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
    const start = new Date(date);
    start.setDate(date.getDate() - dayIndex);
    return start;
  };

  const changeWeek = (direction: 'next' | 'prev') => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newWeek);
  };

  const getWeeklySchedule = () => {
    const startOfWeek = getStartOfWeek(currentWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return listScheduleFilter.filter(({ startAt }) => {
      const date = new Date(startAt);
      return date >= startOfWeek && date <= endOfWeek;
    });
  };

  const handleClick = async (item: any) => {
    dispatch(setCurrentSchedule(item));
    setOpenPopup(true);
  };

  const renderTable = () => {
    const startOfWeek = getStartOfWeek(currentWeek);
    const weeklySchedule = getWeeklySchedule();

    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });

    return (
      <div
        className="overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 250px)' }}
      >
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="sticky top-0 bg-white z-10">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Phòng</th>
              {days.map((day, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2">
                  <p className="text-base font-bold">{daysOfWeek[index]}</p>
                  <p className="italic font-normal">
                    {dayjs(day).format('DD/MM/YYYY')}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listRoom.map((room: any) => (
              <tr key={room.id}>
                <td className="border border-gray-300 px-4 py-2 text-center font-bold w-1/8">
                  {room.name}.{room.building}
                </td>
                {days.map((day, index) => {
                  const schedules = weeklySchedule.filter(
                    ({ startAt, roomName }) =>
                      dayjs(startAt).isSame(day, 'day') &&
                      roomName === `${room.name}.${room.building}`
                  );
                  return (
                    <td
                      key={index}
                      className="border border-gray-300 p-1"
                      style={{ width: '12.5%' }}
                    >
                      {schedules.length > 0 ? (
                        schedules.map((schedule) => {
                          const caHocItem = listCaHoc.find(
                            (ca) => ca.value === schedule.caHoc
                          );
                          return (
                            <div
                              key={schedule.scheduleId}
                              className={style.scheduleItem}
                              style={{
                                backgroundColor: caHocItem?.bgColor,
                                color: caHocItem?.color
                              }}
                              onClick={() => handleClick(schedule)}
                            >
                              <div>
                                <strong>{schedule.subjectName}</strong>
                              </div>
                              <div>
                                Lớp: <i>{schedule.className}</i>
                              </div>
                              <div>Tiết: {caHocItem?.range}</div>
                              <div>Gờ: {caHocItem?.time}</div>
                              <div className={style.tenGV}>
                                Giảng viên: <b>{schedule.teacherId}</b>
                              </div>
                              {schedule.status === 2 && (
                                <div className={style.tamngung}>
                                  <span>Tạm ngưng</span>
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div></div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-2xl h-full">
      {/* Thanh filter */}
      <div className="w-full flex gap-4 items-center justify-center">
        <div className="flex items-center gap-2">
          <label htmlFor="building" className="cursor-pointer">
            Tòa:
          </label>
          <Select
            id="building"
            labelInValue
            placeholder="Chọn tòa nhà cần xem lịch"
            options={[{ value: 'H1' }, { value: 'H2' }, { value: 'H3' }]}
            onChange={onChangeBuilding}
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="teacher" className="cursor-pointer">
            Giảng viên:
          </label>
          <Select
            id="teacher"
            placeholder="Chọn giảng viên muốn xem"
            options={listTeacher?.map((t: any) => {
              return {
                value: t.teacherId,
                label: t.teacherId + ' - ' + t.tenGiangVien
              };
            })}
            onChange={onChangeTeacher}
          />
        </div>
        <div>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => setOpenModalCreate(true)}
          >
            Tạo
          </Button>
        </div>
      </div>

      {/* Giao diện lịch học */}
      <div>
        <div className={style.actions}>
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => changeWeek('prev')}
          >
            Tuần trước
          </Button>

          <Button type="primary" onClick={() => changeWeek('next')}>
            <span>Tuần tiếp</span>
            <span>
              <ArrowRightOutlined />
            </span>
          </Button>
        </div>
        <div>{renderTable()}</div>

        {/* chú thích */}
        <div className={style.noteContainer}>
          {listCaHoc.map((ca: any) => {
            return (
              <div key={ca.value} className="flex gap-1">
                <div
                  className={style.emptyBox}
                  style={{ backgroundColor: ca.bgColor }}
                />
                <div className="font-medium text-base">{ca.name}</div>
              </div>
            );
          })}
        </div>

        <ModalPostponeSchedule
          open={openPopup}
          onCancel={() => setOpenPopup(false)}
        />
        <ModalCreateSchedule
          open={openModalCreate}
          onCancel={() => setOpenModalCreate(false)}
        />
      </div>
    </div>
  );
};

export default AdminSchedule;
