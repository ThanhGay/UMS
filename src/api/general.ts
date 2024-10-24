import axios from 'axios';

export const apiAllTeacher = async () => {
  const url = `${process.env.HIEU_URL}/Get-all-teacher`;

  const { data } = await axios.get(url);
  return data ?? {};
};

export const apiAllNganh = async () => {
  const url = `${process.env.HIEU_URL}/Get-all-nganh`;

  const { data } = await axios.get(url);
  return data ?? {};
};

export const apiAllBoMon = async () => {
  const url = `${process.env.HIEU_URL}/Get-all-bo-mon`;

  const { data } = await axios.get(url);
  return data ?? {};
};
