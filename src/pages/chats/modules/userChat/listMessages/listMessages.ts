import tpl from "./listMessages.tmpl";
import Block from "../../../../../services/Block";

export default class ListMessages extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
