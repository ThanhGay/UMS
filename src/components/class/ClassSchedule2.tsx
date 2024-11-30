import React from 'react';
import { Calendar, Badge } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useAppSelector } from '@redux/hooks';

// Dữ liệu kiểu TypeScript
interface ClassData {
  id: number;
  lopHpId: number;
  roomName: string;
  caHoc: number;
  startAt: string;
  status: number;
}

const ClassSchedule2: React.FC = () => {
  // Mock dữ liệu
  const { data: MyData } = useAppSelector((state) => state.classState.current);
  // Mock dữ liệu
  const data = MyData?.schedules;

  // Hàm xử lý dữ liệu cho từng ngày
  const getListData = (value: Moment) => {
    const dateString = value.format('YYYY-MM-DD');
    return data
      .filter(
        (item: any) => moment(item.startAt).format('YYYY-MM-DD') === dateString
      )
      .map((item: any) => ({
        type: 'success', // Hoặc "warning", "error", "default" tùy ý
        content: `Phòng ${item.roomName} - Ca ${item.caHoc}`
      }));
  };

  // Hàm render nội dung trong mỗi ngày
  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {listData.map((item: any, index: number) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar cellRender={dateCellRender} />;
};

export default ClassSchedule2;
