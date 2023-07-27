import tpl from "./input.tmpl";
import Block from "../../services/Block";

export default class Input extends Block {
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
