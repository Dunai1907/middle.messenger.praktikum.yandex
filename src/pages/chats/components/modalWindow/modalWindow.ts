import tpl from "./modalWindow.tmpl";
import Block from "../../../../services/Block";
import Button from "../../../../components/button/button";

type ModalWindowProps = {
  classContent: string;
  classSpan: string;
  name: string;
  dataName: string;
  classLabel: string;
  labelName: string;
  inputName: string;
  classInput: string;
  classLine: string;
  buttonAction: Button;
  attr: Record<string, string>;
};

export default class ModalWindow extends Block<ModalWindowProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
