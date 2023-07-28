import tpl from "./userChat.tmpl";
import Block from "../../../../services/Block";
import UserData from "./userData/userData";
import WindowActions from "../../components/windowActions/windowActions";
import ListMessages from "./listMessages/listMessages";
import CreateMessage from "./createMessage/createMessage";

type UserChatProps = {
  userData: UserData;
  blockActions: WindowActions;
  stylesLine: string;
  listMessages: ListMessages;
  blockUpload: WindowActions;
  createMessage: CreateMessage;
  attr: Record<string, string>;
};

export default class UserChat extends Block<UserChatProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
