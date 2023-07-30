import tpl from "./profile.tmpl";
import Block from "../../services/Block";
import GoBack from "../../components/goBack/goBack";
import Avatar from "../../components/avatar/avatar";
import BlockData from "./modules/blockData/blockData";
import BlockAction from "./modules/blockAction/blockAction";

type ProfileProps = {
  goBack: GoBack;
  classData: string;
  avatar: Avatar;
  className: string;
  name: string;
  blockData: BlockData;
  blockAction: BlockAction;
  attr: Record<string, string>;
};

export default class Profile extends Block<ProfileProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
