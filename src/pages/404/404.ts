import tpl from './404.tmpl';
import Block from "../../services/Block";

export default class NotFound extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
