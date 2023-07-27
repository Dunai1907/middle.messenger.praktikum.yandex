import tpl from "./500.tmpl";
import Block from "../../services/Block";

export default class ServerError extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
