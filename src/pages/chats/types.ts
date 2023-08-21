import ModalWindow from "./components/modalWindow/modalWindow";
import ListChats from "./modules/listChats/listChats";
import UserChat from "./modules/userChat/userChat";

export class ChatsPageProps {
  modalWindowAdd?: ModalWindow;
  modalWindowDelete?: ModalWindow;
  listChats?: ListChats;
  userChat?: UserChat;
  attr?: Record<string, string>;
  events?: {};
}