import tpl from "./login.tmpl";
import Block from "../../services/Block";

export default class Login extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
