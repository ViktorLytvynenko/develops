import { instance } from '@/api/instance';

export const getAllCars = async () => {
  const { data } = await instance.get('/GetMakesForVehicleType/car?format=json');
  return data;
};

export const getCarsByTypeAndYear = async (makeId, year) => {
  const { data } = await instance.get(
    `/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
  );
  return data;
};
