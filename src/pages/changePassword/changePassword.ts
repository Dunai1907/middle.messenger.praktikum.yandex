import tpl from "./changePassword.tmpl";
import Block from "../../services/Block";
import GoBack from "../../components/goBack/goBack";
import Avatar from "../../components/avatar/avatar";
import ChangeBlockPassword from "./blockPassword/blockPassword";

type ChangePasswordProps = {
  goBack: GoBack;
  classData: string;
  avatar: Avatar;
  blockPassword: ChangeBlockPassword;
  attr: Record<string, string>;
};

export default class ChangePassword extends Block<ChangePasswordProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
