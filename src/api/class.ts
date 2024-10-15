import axios from 'axios';

const ClassURL = `${process.env.BASE_URL_API}/LopHP`;

export const apiAllClassHP = async () => {
  const url = `${ClassURL}/all`;

  const { data } = await axios.get(url);
  return data ?? {};
};

export const apiGetScheduleOfLHP = async (lhpId: number) => {
  const url = `${ClassURL}/schedule/${lhpId}`;

  const { data } = await axios.get(url);
  return data ?? {};
};

export const apiGetStudentsOfLHP = async (lhpId: number) => {
  const url = `${ClassURL}/students/${lhpId}`;

  const { data } = await axios.get(url);
  return data ?? {};
};

export const apiCreateSchedule = async (args: {
  lopHpId: number;
  roomId: number;
  caHoc: number;
  startAt: string;
  endAt: string;
  dayOfWeek: number;
}) => {
  const url = `${ClassURL}/create-schedule`;

  const { data } = await axios.post(url, args);
  return data ?? {};
};

export const apiCreateLhp = async (args: {
  className: string;
  teacherId: string;
  subjectId: number;
  pricePerTinChi: number;
}) => {
  const url = `${ClassURL}/create`;

  const { data } = await axios.post(url, args);
  return data ?? {};
};
