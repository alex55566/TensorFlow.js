import { makeAutoObservable } from "mobx";

class MainStore {
  isLoading = false;
  isError = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setIsError(isError: boolean) {
    this.isError = isError;
  }
}

export const mainStore = new MainStore();
