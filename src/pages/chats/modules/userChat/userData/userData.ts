import tpl from "./userData.tmpl";
import Block from "../../../../../services/Block";

export default class UserData extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}