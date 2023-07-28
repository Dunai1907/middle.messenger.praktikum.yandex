import tpl from "./blockData.tmpl";
import Block from "../../../../services/Block";
import DataProfile from "../../components/data/data";

type BlockDataProps = {
  dataEmail: DataProfile;
  classLine: string;
  dataLogin: DataProfile;
  dataFirstName: DataProfile;
  dataSecondName: DataProfile;
  dataChatsName: DataProfile;
  dataPhone: DataProfile;
  attr: Record<string, string>;
};

export default class BlockData extends Block<BlockDataProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
