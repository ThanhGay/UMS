'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { TableProps } from 'antd';
import { Button, Collapse, ConfigProvider, Table, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { resetCurrentCtk } from '@redux/features/ctkSlice';
import { apiGetSubjectByIds } from '@/src/api/subject';

function DetailCTK() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: detailCtk } = useAppSelector((state) => state.ctkState.current);

  return (
    <div>
      <Button
        type="link"
        icon={<LeftOutlined />}
        style={{ color: 'black', fontSize: 16, paddingLeft: 0 }}
        onClick={() => {
          dispatch(resetCurrentCtk());
          router.back();
        }}
      >
        Quay lại
      </Button>
      <div className="p-5 mt-5 rounded-lg bg-white">
        <Typography.Title level={3} style={{ marginBottom: 40 }}>
          Chi tiết chương trình khung ngành "{detailCtk?.chuyenNganhId}"
        </Typography.Title>
        <Collapse
          // accordion
          items={detailCtk?.detailCTKByKiHocDtos.map((semester: any) => {
            return {
              key: semester?.kiHoc,
              label: semester?.kiHoc,
              children: <DisplaySemester subjectIds={semester?.subjects} />
            };
          })}
        />
      </div>
    </div>
  );
}

interface DataType {
  key: number;
  maMonHoc: string;
  tenMon: string;
  soTin: number;
  boMonId: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'STT',
    dataIndex: 'key',
    key: 'key',
    align: 'center'
  },
  {
    title: 'Mã môn học',
    dataIndex: 'maMonHoc',
    key: 'maHocPhan',
    align: 'center'
    // render: (value) => <div className="text-start">{value}</div>
  },
  {
    title: 'Tên môn học',
    dataIndex: 'tenMon',
    key: 'name',
    align: 'center',
    render: (value) => <div className="text-start">{value}</div>
  },
  {
    title: 'Số tín chỉ',
    dataIndex: 'soTin',
    key: 'soTin',
    align: 'center'
  }
];

const DisplaySemester = ({ subjectIds }: { subjectIds: string[] }) => {
  const [subjects, setSubjects] = useState<DataType[]>([]);
  useEffect(() => {
    (async () => {
      const dataRes = await apiGetSubjectByIds(subjectIds);

      if (dataRes) {
        const _subjects = dataRes.items.map((item: any, idx: number) => {
          return {
            ...item,
            key: idx + 1
          };
        });
        setSubjects(_subjects);
      }
    })();
  }, [subjectIds]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: '#e7ecf0'
          }
        }
      }}
    >
      <Table
        bordered
        rowKey={(value) => value.maMonHoc}
        columns={columns}
        dataSource={subjects}
        pagination={false}
      />
    </ConfigProvider>
  );
};

export default DetailCTK;
