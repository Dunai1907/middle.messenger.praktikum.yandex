import tpl from "./form.tmpl";
import Block from "../../services/Block";

export default class Form extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
