import { useEffect, useState } from 'react';
import { ConfigProvider, Table, TableProps } from 'antd';
import { apiGetSubjectByIds } from '@/src/api/subject';

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

export default DisplaySemester;
