import tpl from "./goBack.tmpl";
import Block from "../../services/Block";

export default class GoBack extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
