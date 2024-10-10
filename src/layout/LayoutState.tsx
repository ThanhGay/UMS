'use client';

import { PropsWithChildren, useEffect } from 'react';

import { useAppDispatch } from '@redux/hooks';
import { getListCtk } from '@redux/features/ctkSlice';
import { getListSubject } from '@redux/features/subjectSlice';
import { getListClass, getListTeacher } from '@redux/features/classSlice';

function LayoutState(props: PropsWithChildren) {
  const { children } = props;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getListCtk());
    dispatch(getListSubject());
    dispatch(getListClass());
    dispatch(getListCtk());
    dispatch(getListTeacher());
  }, []);

  return <div>{children}</div>;
}

export default LayoutState;
