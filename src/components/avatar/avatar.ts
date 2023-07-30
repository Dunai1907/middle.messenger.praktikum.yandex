import tpl from "./avatar.tmpl";
import Block from "../../services/Block";
type AvatarProps = {
  unionSVG: string;
  width?: string;
  height?: string;
  attr?: {};
};

export default class Avatar extends Block<AvatarProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
