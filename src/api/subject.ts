import axios from 'axios';

const SubjectUrl = `${process.env.BASE_URL_API}/Subject`;

export const apiAllSubject = async (): Promise<{
  status: boolean;
  data: any;
  message: string;
}> => {
  const url = `${SubjectUrl}/all`;

  const { data } = await axios.get(url);
  return data ?? {};
};

export const apiGetDetailSubject = async (
  subjectId: any
): Promise<{ status: boolean; data: any; message: string }> => {
  const url = `${SubjectUrl}/get/${subjectId}`;

  const { data } = await axios.get(url);
  return data ?? {};
};

export const apiUpdateSubject = async (args: {
  id: string;
  maHocPhan: string;
  name: string;
  soTinChi: number;
}): Promise<{ status: boolean; data: any; message: string }> => {
  const url = `${SubjectUrl}/update`;
  const reqBody = args;

  const { data } = await axios.put(url, reqBody);
  return data ?? {};
};
