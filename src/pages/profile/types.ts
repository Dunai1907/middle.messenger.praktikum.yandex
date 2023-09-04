import GoBack from "../../components/goBack/goBack";
import Avatar from "../../components/avatar/avatar";
import BlockData from "./modules/blockData/blockData";
import BlockAction from "./modules/blockAction/blockAction";
import ModalWindow from "../chats/components/modalWindow/modalWindow";

export class userData {
  first_name?: string;
  second_name?: string;
  login?: string;
  id?: number;
  avatar?: string;
  display_name?: string;
  email?: string;
  phone?: string;
}

export class ProfileProps {
  modalWindowChangeAvatar?: ModalWindow;
  goBack?: GoBack;
  classData?: string;
  avatar?: Avatar;
  className?: string;
  name?: string;
  blockData?: BlockData;
  blockAction?: BlockAction;
  userData?: userData;
  attr?: Record<string, string>;
}
