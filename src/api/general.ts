import axios from 'axios';

export const apiAllTeacher = async () => {
  const url = `${process.env.HIEU_URL}/Get-all-teacher`;

  const { data } = await axios.get(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });
  return data ?? {};
};

export const apiAllNganh = async (token: string) => {
  const url = `${process.env.HIEU_URL}/Get-all-nganh`;

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  });
  return data ?? {};
};

export const apiAllBoMon = async (token: string) => {
  const url = `${process.env.HIEU_URL}/Get-all-bo-mon`;

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  });
  return data ?? {};
};
