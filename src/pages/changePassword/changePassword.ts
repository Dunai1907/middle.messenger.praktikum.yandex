import tpl from "./changePassword.tmpl";
import Block from "../../services/Block";

export default class ChangePassword extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
