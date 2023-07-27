import tpl from "./listChats.tmpl";
import Block from "../../../../services/Block";

export default class ListChats extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
