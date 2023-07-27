import tpl from "./profile.tmpl";
import Block from "../../services/Block";

export default class Profile extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
