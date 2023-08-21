import tpl from "./listChats.tmpl";
import Block from "../../../../services/Block";
import store from "../../../../services/Store";
import { ListChatsProps } from "./types";

export default class ListChats extends Block<ListChatsProps> {
  addEvents() {
    const div = this._element.querySelectorAll('[data-name="selectChat"]')
    div.forEach((item: any) => item.addEventListener("click", this.handler))
      // .addEventListener("click", this._props.events.click);

    super.addEvents();
  }

  handler(event: any) {
    console.log('event <-------', event.currentTarget);
    store.set("selectedChat", event.currentTarget);
  }
  render() {
    return this._compile(tpl, this._props);
  }
}
