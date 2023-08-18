import tpl from "./chats.tmpl";
import Block from "../../services/Block";
import ModalWindow from "./components/modalWindow/modalWindow";
import ListChats from "./modules/listChats/listChats";
import UserChat from "./modules/userChat/userChat";
import ChatsController from "../../controllers/chats";
import AuthController from "../../controllers/auth";

type ChatsProps = {
  modalWindowAdd: ModalWindow;
  modalWindowDelete: ModalWindow;
  listChats: ListChats;
  userChat: UserChat;
  attr: Record<string, string>;
};

const chatsController = new ChatsController();
const authController = new AuthController();
export default class Chats extends Block<ChatsProps> {
  render() {
    authController.getUser();
    chatsController.getListChats();
    return this._compile(tpl, this._props);
  }
}
