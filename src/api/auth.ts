import axios from 'axios';

const AuthUrl = `${process.env.BASE_URL_API}/Auth`;

export const apiLogin = async (args: { email: string; password: string }) => {
  const url = `${AuthUrl}/login`;

  const form = new FormData();
  form.append('Email', args.email);
  form.append('Password', args.password);

  const { data } = await axios.post(url, form);
  return data ?? {};
};

export const apiLoginWithOTP = async ({
  email,
  otp
}: {
  email: string;
  otp: string;
}) => {
  const url = `${AuthUrl}/login-otp`;

  const fmData = new FormData();
  fmData.append('Email', email);
  fmData.append('OTP', otp);

  const { data } = await axios.post(url, fmData);
  return data ?? {};
};
