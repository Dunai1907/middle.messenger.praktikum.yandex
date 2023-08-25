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

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
