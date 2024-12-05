'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Tabs, Typography } from 'antd';
import type { TabsProps } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import {
  apiGetStudentInClass,
  apiGetStudentInLopQL,
  apiGetTeacherInClass
} from '@/src/api/class';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  setListOtherStudents,
  setListStudent,
  setListTeacher
} from '@redux/features/classSlice';
import {
  getDetailSubject,
  resetCurrentSubject
} from '@redux/features/subjectSlice';

import GeneralInformation from '@components/class/GeneralInformation';
import ClassList from '@components/class/ClassList';
import ClassSchedule from '@components/class/ClassSchedule';

function DetailClassHP({ lhpId }: { lhpId: any }) {
  const id = lhpId;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.classState.current);

  useEffect(() => {
    (async () => {
      // get information students in this lopHP
      if (data?.students) {
        const res = await apiGetStudentInClass(data.students);
        dispatch(setListStudent(res.items));
      }

      // get information teacher in this lopHP
      if (data?.teachers) {
        const res = await apiGetTeacherInClass(data.teachers);
        dispatch(setListTeacher(res.items));
      }

      // get detail subject
      if (data?.maMonHoc) {
        dispatch(getDetailSubject(data.maMonHoc));
      }

      // get list other students in lopQL to add to class
      if (data?.className) {
        const dataRes = await apiGetStudentInLopQL(data?.className);
        if (dataRes.items.length !== 0) {
          dispatch(setListOtherStudents(dataRes.items[0].studentDtoss));
        } else {
          dispatch(setListOtherStudents([]));
        }
      }
    })();
  }, [id]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Thông tin chung',
      children: <GeneralInformation />
    },
    {
      key: '2',
      label: 'Danh sách lớp',
      children: <ClassList />
    },
    {
      key: '3',
      label: 'Lịch tổng quan',
      children: <ClassSchedule />
    }
  ];

  return (
    <div>
      <Button
        type="link"
        icon={<LeftOutlined />}
        style={{ color: 'black', fontSize: 16, paddingLeft: 0 }}
        onClick={async () => {
          dispatch(resetCurrentSubject());
          router.back();
        }}
      >
        Quay lại
      </Button>
      <div className="bg-white rounded-xl p-5 mt-5">
        <Typography.Title level={3}>Chi tiết lớp học phần</Typography.Title>
        <Tabs items={items} />
      </div>
    </div>
  );
}

export default DetailClassHP;
