import tpl from "./avatar.tmpl";
import Block from "../../services/Block";

export default class Avatar extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
