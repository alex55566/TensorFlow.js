import { makeAutoObservable } from "mobx";

class ExerciseStore {
  handsUp = 0;

  constructor() {
    makeAutoObservable(this);
  }

  incrementHandsUp = () => {
    this.handsUp += 1;
  };
}

export const exerciseStore = new ExerciseStore();
