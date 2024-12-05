import axios from 'axios';

const ScheduleURL = `${process.env.BASE_URL_API}/Schedule`;

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
