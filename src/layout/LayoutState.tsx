'use client';

import { PropsWithChildren, useEffect } from 'react';

import { useAppDispatch } from '@redux/hooks';
import { getListCtk } from '@redux/features/ctkSlice';
import { getListSubject } from '@redux/features/subjectSlice';
import { getListClass } from '@redux/features/classSlice';
import {
  getListBoMon,
  getListChuyenNganh,
  getListTeacher
} from '@redux/features/generalSlice';

function LayoutState(props: PropsWithChildren) {
  const { children } = props;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getListCtk());
    dispatch(getListClass());
    dispatch(getListBoMon());
    dispatch(getListTeacher());
    dispatch(getListSubject());
    dispatch(getListChuyenNganh());
  }, [dispatch]);

  return <>{children}</>;
}

export default LayoutState;
