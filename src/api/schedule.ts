import axios from 'axios';

const ScheduleURL = `${process.env.BASE_URL_API}/Schedule`;

export const apiSyncSchedule = async () => {
  const url = `${ScheduleURL}/sync`;

  const { data } = await axios.post(url, null, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiGetAllSchedule = async (args: {
  page?: number;
  limit?: number;
  building?: string;
  caHoc?: number;
}) => {
  const { page, limit, building, caHoc } = args;

  const url = `${ScheduleURL}/all?pageIndex=${page}&pageSize=${limit}&nameBuilding=${building}&caHoc=${caHoc}`;

  const { data } = await axios.get(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiGetScheduleOfStudent = async (studentId: string) => {
  const url = `${ScheduleURL}/student/${studentId}`;

  const { data } = await axios.get(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiGetScheduleOfTeacher = async (teacherId: string) => {
  const url = `${ScheduleURL}/teacher/${teacherId}`;

  const { data } = await axios.get(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiPostPoneSchedule = async (scheduleId: number) => {
  const url = `${ScheduleURL}/postpone/${scheduleId}`;

  const { data } = await axios.put(url, null, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};
