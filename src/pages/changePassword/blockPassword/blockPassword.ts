import tpl from "./blockPassword.tmpl";
import Block from "../../../services/Block";

export default class ChangeBlockPassword extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
