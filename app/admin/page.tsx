'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@redux/hooks';
import { getListCtk } from '@redux/features/ctkSlice';
import { getListSubject } from '@redux/features/subjectSlice';

function Index() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getListCtk());
    dispatch(getListSubject());
  }, []);
  return <div>Trang chu Admin</div>;
}

export default Index;
