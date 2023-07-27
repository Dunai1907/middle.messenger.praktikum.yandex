import tpl from "./registration.tmpl";
import Block from "../../services/Block";

export default class Registration extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
