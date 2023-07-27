import tpl from "./chats.tmpl";
import Block from "../../services/Block";

export default class Chats extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
