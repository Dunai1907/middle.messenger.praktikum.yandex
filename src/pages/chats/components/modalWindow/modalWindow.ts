import tpl from "./modalWindow.tmpl";
import Block from "../../../../services/Block";

export default class ModalWindow extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
