import { AxiosResponse } from 'axios';
import { instance } from '.';
import { ShiftType } from 'shared/types/Shift';

export const getShiftList = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const response: AxiosResponse<{
    data: ShiftType[];
    status: number;
  }> = await instance.get(
    `/api/shifts/map-list-unauthorized?latitude${latitude}&longitude=${longitude}`,
  );

  return response.data;
};
