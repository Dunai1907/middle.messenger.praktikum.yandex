import tpl from "./imgButton.tmpl";
import Block from "../../../../services/Block";

type ImgButtonProps = {
  buttonSVG: string;
  attr: Record<string, string>;
  events?: {
    click: () => void;
  };
};

export default class ImgButton extends Block<ImgButtonProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
