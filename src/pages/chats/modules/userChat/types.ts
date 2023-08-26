import Button from "../../../../components/button/button";
import ModalWindow from "../../components/modalWindow/modalWindow";
import WindowActions from "../../components/windowActions/windowActions";
import CreateMessage from "./createMessage/createMessage";
import ListMessages from "./listMessages/listMessages";
import UserData from "./userData/userData";

export class UserChatProps {
  modalWindowChangeAvatar?: ModalWindow;
  isUnSelectChat?: boolean;
  isSelectChat?: boolean;
  stylesDivUnSelect?: string;
  stylesUnSelect?: string;
  stylesSpanUnSelect?: string;
  userData?: UserData;
  blockActions?: WindowActions;
  stylesLine?: string;
  listMessages?: ListMessages;
  buttonDeleteChat?: Button;
  blockUpload?: WindowActions;
  createMessage?: CreateMessage;
  attr!: Record<string, string>;
}
