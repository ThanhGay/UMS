'use client';

import { useEffect, useState } from 'react';
import { Collapse, Typography } from 'antd';

import { useAppSelector } from '@redux/hooks';
import { apiDetailCtkByNganhId } from '@/src/api/ctk';

import DisplaySemester from './DisplaySemester';

function MyCtk() {
  const { user } = useAppSelector((state) => state.authState);

  const [detailCtk, setDetailCtk] = useState<any>();
  useEffect(() => {
    (async () => {
      const dataRes = await apiDetailCtkByNganhId(user?.nganhId);

      if (dataRes) {
        setDetailCtk(dataRes);
      }
    })();
  }, [user]);

  return (
    <div className="px-10 py-5 rounded-lg bg-white">
      <Typography.Title level={3} style={{ marginBottom: 40 }}>
        Chương trình khung ngành "{user?.nganh}"
      </Typography.Title>
      <Collapse
        items={detailCtk?.detailCTKByKiHocDtos.map((semester: any) => {
          return {
            key: semester?.kiHoc,
            label: semester?.kiHoc,
            children: <DisplaySemester subjectIds={semester?.subjects} />
          };
        })}
      />
    </div>
  );
}

export default MyCtk;
