import Button from "../../../../components/button/button";
import Chat from "../../components/chat/chat";
import ModalWindow from "../../components/modalWindow/modalWindow";

export class ListChatsProps {
  modalWindowCreateChat!: ModalWindow;
  hrefValue!: string;
  stylesButtonProfile!: string;
  profileSVG!: string;
  stylesForm!: string;
  searchSVG!: string;
  stylesSearch!: string;
  items?: Chat[];
  buttonCreateChat!: Button;

  attr!: Record<string, string>;
}
