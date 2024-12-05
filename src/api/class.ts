import axios from 'axios';

const ClassURL = `${process.env.BASE_URL_API}/LopHP`;
const ScheduleURL = `${process.env.BASE_URL_API}/Schedule`;
const HieuURL = process.env.HIEU_URL;

export const apiAllClassHP = async () => {
  const url = `${ClassURL}/all`;

  const { data } = await axios.get(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });
  return data ?? {};
};

export const apiGetScheduleOfLHP = async (lhpId: number) => {
  const url = `${ScheduleURL}/lopHp/${lhpId}`;

  const { data } = await axios.get(url, {
    headers: {
      'ngrok-skip-browser-warning': 'any_value'
    }
  });
  return data ?? {};
};

export const apiGetDetailLopHp = async (lhpId: number) => {
  const url = `${ClassURL}/get/${lhpId}`;

  const { data } = await axios.get(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiGetStudentsOfLHP = async (lhpId: number) => {
  const url = `${ClassURL}/get-students/${lhpId}`;

  const { data } = await axios.get(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });
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

  const { data } = await axios.post(url, args, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });
  return data ?? {};
};

export const apiCreateLhp = async (args: {
  className: string;
  teacherIds: string[];
  maMonHoc: string;
  soTinChi: number;
  tenMonHoc: string;
  pricePerTinChi: number;
}) => {
  const url = `${ClassURL}/create`;

  const { data } = await axios.post(url, args, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiGetStudentIdInClass = async (lopHpId: number) => {
  const url = `${ClassURL}/get-students/${lopHpId}`;

  const { data } = await axios.get(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiGetStudentInClass = async (studentIds: string[]) => {
  const url = `${HieuURL}/get-student-by-id`;

  const { data } = await axios.post(url, studentIds, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiGetTeacherIdInClass = async (lopHpId: number) => {
  const url = `${ClassURL}/get-teachers/${lopHpId}`;

  const { data } = await axios.get(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiGetTeacherInClass = async (studentIds: string[]) => {
  const url = `${HieuURL}/get-teacher-by-id`;

  const { data } = await axios.post(url, studentIds, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiAddTeacherToClass = async (args: {
  lopHpId: number;
  teacherId: string;
}) => {
  const url = `${ClassURL}/add-teacher`;

  const { data } = await axios.post(url, args, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiAddStudentsToClass = async (args: {
  lopHpId: number;
  studentIds: string[];
}) => {
  const url = `${ClassURL}/add-student`;

  const config = {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  };
  const { data } = await axios.post(url, args, config);

  return data ?? {};
};

export const apiGetStudentInLopQL = async (lopQLId: string) => {
  const url = `${HieuURL}/Get-all-student-3?KeyWord=${lopQLId}`;

  const { data } = await axios.get(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiDeleteClassHP = async (lopId: number) => {
  const url = `${ClassURL}/delete/${lopId}`;

  const { data } = await axios.delete(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};
