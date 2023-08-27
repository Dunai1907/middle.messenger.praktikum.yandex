import tpl from "./avatar.tmpl";
import Block from "../../services/Block";
type AvatarProps = {
  unionSVG: string;
  width?: string;
  height?: string;
  attr: Record<string, string>;
  events?: {
    // eslint-disable-next-line no-unused-vars
    click: (event: any) => void;
  };
};

export default class Avatar extends Block<AvatarProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
