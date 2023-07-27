import tpl from "./createMessage.tmpl";
import Block from "../../../../../services/Block";

export default class CreateMessage extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
