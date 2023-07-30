import tpl from "./userData.tmpl";
import Block from "../../../../../services/Block";
import Avatar from "../../../../../components/avatar/avatar";
import ImgButton from "../../../components/imgButton/imgButton";

type UserDataProps = {
  avatar: Avatar;
  stylesName: string;
  userName: string;
  imgButtonActions: ImgButton;
  attr: Record<string, string>;
};

export default class UserData extends Block<UserDataProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
