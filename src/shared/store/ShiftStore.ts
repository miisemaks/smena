import { makeAutoObservable } from 'mobx';
import { ShiftType } from 'shared/types/Shift';

class ShiftStore {
  shift: ShiftType | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setShiftData = (data: ShiftType) => {
    this.shift = data;
  };

  clearShift = () => {
    this.shift = null;
  };
}

export default new ShiftStore();
