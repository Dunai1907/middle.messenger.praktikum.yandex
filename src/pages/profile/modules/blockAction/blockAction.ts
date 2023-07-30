import tpl from "./blockAction.tmpl";
import Block from "../../../../services/Block";

type BlockActionProps = {
  classAction: string;
  classMediumBlue: string;
  changeDataPath: string;
  changeData: string;
  classLine: string;
  changePasswordPath: string;
  changePassword: string;
  classRed: string;
  path: string;
  exit: string;
  attr: Record<string, string>;
};

export default class BlockAction extends Block<BlockActionProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
