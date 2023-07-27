import tpl from "./blockAction.tmpl";
import Block from "../../../../services/Block";

export default class BlockAction extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
