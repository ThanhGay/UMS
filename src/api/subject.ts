import axios from 'axios';

const SubjectUrl = `${process.env.BASE_URL_API}/Subject`;

export const apiAllSubject = async () => {
  const url = `${SubjectUrl}/all`;

  const { data } = await axios.get(url);
  return data ?? {};
};

export const apiGetDetailSubject = async (subjectId: any) => {
  const url = `${SubjectUrl}/get/${subjectId}`;

  const { data } = await axios.get(url);
  return data ?? {};
};

export const apiUpdateSubject = async (args: {
  id: number;
  maHocPhan: string;
  name: string;
  soTinChi: number;
  boMonId: number;
}) => {
  const url = `${SubjectUrl}/update`;
  const reqBody = args;

  const { data } = await axios.put(url, reqBody);
  return data ?? {};
};

export const apiCreateSubject = async (args: {
  maHocPhan: string;
  name: string;
  soTinChi: number;
  boMonId: number;
}) => {
  const url = `${SubjectUrl}/create`;
  const reqBody = args;

  const { data } = await axios.post(url, reqBody);
  return data ?? {};
};

export const apiDeleteSubject = async (subjectId: any) => {
  const url = `${SubjectUrl}/delete?id=${subjectId}`;

  const { data } = await axios.delete(url);

  return data ?? {};
};
