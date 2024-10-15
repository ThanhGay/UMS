import axios from 'axios';

const AuthUrl = `${process.env.HIEU_URL}`;

export const apiLoginStudent = async (args: {
  email: string;
  password: string;
}) => {
  const url = `${AuthUrl}/Login-student`;

  const { data } = await axios.post(url, args);
  return data ?? {};
};

export const apiLoginTeacher = async (args: {
  email: string;
  password: string;
}) => {
  const url = `${AuthUrl}/Login-teacher`;

  const { data } = await axios.post(url, args);
  return data ?? {};
};

export const apiLoginAdmin = async (args: {
  email: string;
  password: string;
}) => {
  const url = `${AuthUrl}/Login-manager`;

  const { data } = await axios.post(url, args);
  return data ?? {};
};
