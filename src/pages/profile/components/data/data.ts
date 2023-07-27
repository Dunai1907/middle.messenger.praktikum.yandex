import tpl from "./data.tmpl";
import Block from "../../../../services/Block";

export default class DataProfile extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
