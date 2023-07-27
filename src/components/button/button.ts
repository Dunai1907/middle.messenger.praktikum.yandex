import tpl from "./button.tmpl";
import Block from "../../services/Block";

export default class Button extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
