import axios from 'axios';

const SubjectUrl = `${process.env.HIEU_URL}`;

export const apiAllSubject = async () => {
  const urlHieu = `${SubjectUrl}/Get-all-mon-hoc`;

  const { data } = await axios.get(urlHieu, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiGetDetailSubject = async (maMonHoc: any) => {
  const urlHieu = `${SubjectUrl}/Get-mon-hoc-by-Id?KeyWord=${maMonHoc}`;

  const { data } = await axios.get(urlHieu, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiGetSubjectByIds = async (subjectIds: string[]) => {
  const url = `${SubjectUrl}/get-mon-hoc-by-Id-2`;

  const { data } = await axios.post(url, subjectIds, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiCreateSubject = async (
  args: {
    maMonHoc: string;
    tenMon: string;
    sotin: number;
    boMonId: string;
  },
  token: string
) => {
  const url = `${SubjectUrl}/Add-Mon-Hoc`;
  const reqBody = args;

  const { data } = await axios.post(url, reqBody, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  });
  return data ?? {};
};

export const apiDeleteSubject = async (maMonHoc: string) => {
  const url = `${SubjectUrl}/Delete-mon-hoc?maMonHoc=${maMonHoc}`;

  const { data } = await axios.delete(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiGetTeacherBySubject = async (maMonHoc: string) => {
  const url = `${SubjectUrl}/Get-teacher-phu-trach?maMonHoc=${maMonHoc}`;

  const { data } = await axios.delete(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};
