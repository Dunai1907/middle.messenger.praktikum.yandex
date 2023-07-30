import tpl from "./blockPassword.tmpl";
import Block from "../../../services/Block";
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";

type ChangeBlockPasswordProps = {
  oldPassword: Input;
  newPassword: Input;
  repeatNewPassword: Input;
  buttonSubmit: Button;
  classLine: string;
  attr?: Record<string, string>;
  events?: {};
};

export default class ChangeBlockPassword extends Block<ChangeBlockPasswordProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
