'use client';

import { PropsWithChildren, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getListCtk } from '@redux/features/ctkSlice';
import { getListSubject } from '@redux/features/subjectSlice';
import { getListClass } from '@redux/features/classSlice';
import {
  getListBoMon,
  getListChuyenNganh,
  getListPhong,
  getListTeacher
} from '@redux/features/generalSlice';
import { getAllSchedule } from '@redux/features/schedule';
import { getCookie } from '../cookie';
import { setToken } from '@redux/features/authSlice';
import { apiSyncSchedule } from '../api/schedule';

function LayoutState(props: PropsWithChildren) {
  const { children } = props;
  const { token } = useAppSelector((state) => state.authState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const tokenInCookie = getCookie('token');
    if (tokenInCookie) {
      dispatch(setToken(tokenInCookie));
    }
  }, []);

  useEffect(() => {
    apiSyncSchedule();
    dispatch(getListCtk());
    dispatch(getListClass());
    dispatch(getListTeacher());
    dispatch(getListSubject());
    dispatch(getListPhong());

    if (token) {
      dispatch(getListBoMon(token));
      dispatch(getListChuyenNganh(token));
    }
  }, [dispatch, token]);

  return <>{children}</>;
}

export default LayoutState;
