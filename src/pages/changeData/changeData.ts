import tpl from "./changeData.tmpl";
import Block from "../../services/Block";
import GoBack from "../../components/goBack/goBack";
import Avatar from "../../components/avatar/avatar";
import ChangeBlockData from "./blockData/blockData";

type ChangeDataProps = {
  goBack: GoBack;
  classData: string;
  avatar: Avatar;
  blockData: ChangeBlockData;
  attr: Record<string, string>;
};

export default class ChangeData extends Block<ChangeDataProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
