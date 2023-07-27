import tpl from "./chat.tmpl";
import Block from "../../../../services/Block";

export default class Chat extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
