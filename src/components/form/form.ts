import tpl from "./form.tmpl";
import Block from "../../services/Block";
import Button from "../button/button";
import Input from "../input/input";

type FormProps = {
  buttonBig: Button;
  inputEmail?: Input;
  inputLogin?: Input;
  inputFirstName?: Input;
  inputSecondName?: Input;
  inputPhone?: Input;
  inputPassword?: Input;
  inputRepeatPassword?: Input;
  buttonSmall: Button;
  attr?: {};
  events?: {};
};

export default class Form extends Block<FormProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
