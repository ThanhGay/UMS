import axios from 'axios';

const CtkUrl = `${process.env.BASE_URL_API}/ChuongTrinhKhung`;

export const apiAllCtk = async () => {
  const url = `${CtkUrl}/all`;

  const { data } = await axios.get(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiDetailCtk = async (id: number) => {
  const url = `${CtkUrl}/get-by-id/${id}`;

  const { data } = await axios.get(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiDetailCtkByNganhId = async (chuyenNganhId: string) => {
  const url = `${CtkUrl}/get/${chuyenNganhId}`;

  const { data } = await axios.get(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiCreateCtk = async (args: {
  chuyenNganhId: number;
  details: {
    kiHoc: string;
    monHocIds: number[];
  }[];
}) => {
  const url = `${CtkUrl}/create`;

  const { data } = await axios.post(url, args, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};

export const apiDeleteCtk = async (id: any) => {
  const url = `${CtkUrl}/delete?id=${id}`;

  const { data } = await axios.delete(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });

  return data ?? {};
};
