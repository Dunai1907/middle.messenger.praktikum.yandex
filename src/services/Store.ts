/* eslint-disable no-unused-vars */
import EventBus from "./EventBus";
import set from "../utils/set";

export type Indexed<T = any> = {
  [key in string]: T;
};

export enum StoreEvents {
  Updated = "updated",
}

class Store extends EventBus {
  static _instance: any;
  static STORE_NAME = "myAppStore";
  private state: Indexed = {};

  constructor() {
    if (Store._instance) {
      return Store._instance;
    }
    super();
    const savedState = localStorage.getItem(Store.STORE_NAME);
    this.state = savedState ? JSON.parse(savedState) ?? {} : {};

    Store._instance = this;
    this.on(StoreEvents.Updated, () => {
      localStorage.setItem(Store.STORE_NAME, JSON.stringify(this.state));
    });
  }

  public getState() {
    return this.state;
  }

  public removeState() {
    this.state = {};
    this.emit(StoreEvents.Updated);
    localStorage.clear();
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
