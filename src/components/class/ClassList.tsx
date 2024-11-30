import { useEffect, useState } from 'react';
import { Avatar, Button, Modal, Select, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { useAppSelector } from '@redux/hooks';
import { apiAddStudentsToClass, apiGetStudentInLopQL } from '@/src/api/class';
import Image from 'next/image';

function ClassList() {
  const { data } = useAppSelector((state) => state.classState.current);

  const [selected, setSelected] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [listStudent, setListStudent] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const dataRes = await apiGetStudentInLopQL(data?.className);
      if (dataRes) {
        setListStudent(dataRes.items[0]?.studentDtoss);
      }
    })();
  }, [data?.className]);

  const onChangeSelect = (values: string[]) => {
    setSelected(values);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleOk = async () => {
    (async () => {
      try {
        const dataRes = await apiAddStudentsToClass({
          lopHpId: data?.id,
          studentIds: selected
        });

        if (dataRes) {
          console.log(dataRes);
          setSelected([]);
          setOpenModal(false);
        }
      } catch (error: any) {
        alert(error.response.data);
      }
    })();
  };

  return (
    <div className="relative min-h-10">
      <div className="absolute top-0 right-0">
        <Button
          onClick={() => setOpenModal(true)}
          icon={<PlusCircleOutlined />}
        >
          Thêm
        </Button>
      </div>

      {/* Danh sách sinh viên */}
      <Space direction="vertical">
        {data?.studentInClass.map((item: any, idx: number) => (
          <div key={idx} className="flex justify-start items-center gap-4">
            <Image
              src={process.env.HIEU_URL + item.image}
              alt={'avatar ' + item.username}
              width={48}
              height={48}
              style={{ borderRadius: '50%' }}
            />
            <div className="flex flex-col">
              <p className="font-semibold text-base">{item.username}</p>
              <p className="text-gray-500">
                MSSV:<span className="ml-1">{item.studentId}</span>
              </p>
            </div>
          </div>
        ))}
      </Space>

      <Modal
        title="Thêm sinh viên vào lớp"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical" className="w-full min-h-10">
          <label htmlFor="dsTeacherBoMon">
            Danh sách sinh viên lớp {data?.className}
          </label>
          <Select
            id="dsTeacherBoMon"
            mode="multiple"
            style={{ width: '100%' }}
            options={listStudent?.map((student: any) => {
              return {
                value: student.studentId,
                label: student.username
              };
            })}
            onChange={onChangeSelect}
          />
        </Space>
      </Modal>
    </div>
  );
}

export default ClassList;
