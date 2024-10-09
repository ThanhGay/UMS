import axios from 'axios';

export const apiAllTeacher = async () => {
  const url = `${process.env.HIEU_URL}/Get-all-teacher`;

  const { data } = await axios.get(url);

  return data ?? {};
};
