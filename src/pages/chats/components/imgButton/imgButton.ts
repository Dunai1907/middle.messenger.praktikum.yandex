import tpl from "./imgButton.tmpl";
import Block from "../../../../services/Block";

export default class ImgButton extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
