import tpl from "./button.tmpl";
import Block from "../../services/Block";

type ButtonProps = {
  classSpan?: string;
  name: string;
  attr: Record<string, string>;
  events?: {};
};

export default class Button extends Block<ButtonProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
