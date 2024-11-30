import axios from 'axios';

const BuildingUrl = `${process.env.BASE_URL_API}/Building`;

export const apiAllBuilding = async () => {
  const url = `${BuildingUrl}/all`;

  const { data } = await axios.get(url, {
    headers: { 'ngrok-skip-browser-warning': 'any_value' }
  });
  return data ?? {};
};
