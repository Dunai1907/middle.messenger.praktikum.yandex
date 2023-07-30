import tpl from "./blockData.tmpl";
import Block from "../../../services/Block";
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";

type ChangeBlockDataProps = {
  changeEmail: Input;
  changeLogin: Input;
  changeFirstName: Input;
  changeSecondName: Input;
  changeChatsName: Input;
  changePhone: Input;
  buttonSubmit: Button;
  classLine: string;
  attr?: Record<string, string>;
  events?: {};
};

export default class ChangeBlockData extends Block<ChangeBlockDataProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
