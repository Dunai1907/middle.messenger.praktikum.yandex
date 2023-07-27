import tpl from "./changeData.tmpl";
import Block from "../../services/Block";

export default class ChangeData extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
