import tpl from "./chats.tmpl";
import Block from "../../services/Block";
import ModalWindow from "./components/modalWindow/modalWindow";
import ListChats from "./modules/listChats/listChats";
import UserChat from "./modules/userChat/userChat";

type ChatsProps = {
  modalWindowAdd: ModalWindow;
  modalWindowDelete: ModalWindow;
  listChats: ListChats;
  userChat: UserChat;
  attr: Record<string, string>;
};

export default class Chats extends Block<ChatsProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
