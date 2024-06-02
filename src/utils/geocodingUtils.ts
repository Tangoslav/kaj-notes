export const getCityFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
  const apiKey = '22eb3a4e2cde4d97848f5fa1a99a9576';
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
  );
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    return data.results[0].formatted;
  }
  return 'Unknown location';
};