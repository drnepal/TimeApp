import api from './client'; // ✅ client.ts must be in the same folder

export const fetchWeatherFromBackend = async (
  lat: number,
  lon: number,
  unit: 'celsius' | 'fahrenheit'
) => {
  const units = unit === 'celsius' ? 'metric' : 'imperial';
  const response = await api.get('/weather', {
    params: { lat, lon, units },
  });
  return response.data;
};
