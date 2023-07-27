import tpl from "./windowActions.tmpl";
import Block from "../../../../services/Block";

export default class WindowActions extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
