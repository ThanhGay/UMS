import axios from 'axios';

const ClassURL = `${process.env.BASE_URL_API}/LopHP`;
const ScheduleURL = `${process.env.BASE_URL_API}/Schedule`;

export const apiAllClassHP = async () => {
  const url = `${ClassURL}/all`;

  const { data } = await axios.get(url);
  return data ?? {};
};

export const apiGetScheduleOfLHP = async (lhpId: number) => {
  const url = `${ScheduleURL}/lopHp/${lhpId}`;

  const { data } = await axios.get(url);
  return data ?? {};
};

export const apiGetDetailLopHp = async (lhpId: number) => {
  const url = `${ClassURL}/get/${lhpId}`

  const {data } = await axios.get(url)

  return data ?? {}
};

export const apiGetStudentsOfLHP = async (lhpId: number) => {
  const url = `${ClassURL}/get-students/${lhpId}`;

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
  const url = `${ScheduleURL}/create-schedule-lopHp`;

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
