import tpl from "./input.tmpl";
import Block from "../../services/Block";

type InputProps = {
  classLabel: string;
  labelName: string;
  type: string;
  inputName: string;
  classInput: string;
  value?: string;
  classLine?: string;
  classError?: string;
  attr: Record<string, string>;
  events?: {};
};

export default class Input extends Block<InputProps> {
  render() {
    return this._compile(tpl, this._props);
  }

  addEvents() {
    this._element
      .querySelector("input")
      .addEventListener("blur", this._props.events.blur);

    super.addEvents();
  }
}
