import EventBus from "./EventBus";
import set from "../utils/set";

export enum StoreEvents {
  // eslint-disable-next-line no-unused-vars
  Updated = 'updated',
}

class Store extends EventBus {
  private state: /* Indexed */any = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    // метод EventBus
    this.emit(StoreEvents.Updated);
  };
}

export default new Store();