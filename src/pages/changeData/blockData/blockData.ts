import tpl from "./blockData.tmpl";
import Block from "../../../services/Block";

export default class ChangeBlockData extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
