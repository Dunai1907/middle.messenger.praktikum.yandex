import tpl from "./listChats.tmpl";
import Block from "../../../../services/Block";
import Button from "../../../../components/button/button";
import ModalWindow from "../../components/modalWindow/modalWindow";

type ChatProp = {
  stylesChat: string;
  stylesAvatar: string;
  avatar: string;
  stylesMain: string;
  stylesWrap: string;
  stylesName: string;
  stylesSpanName: string;
  name: string;
  stylesDate: string;
  stylesSpanDate: string;
  date: string;
  stylesText: string;
  stylesSpanText: string;
  text: string;
  stylesNumber: string;
  stylesSpanNumber: string;
  number: string;
};

type ListChatsProps = {
  modalWindowCreateChat: ModalWindow;
  hrefValue: string;
  stylesButtonProfile: string;
  profileSVG: string;
  stylesForm: string;
  searchSVG: string;
  stylesSearch: string;
  items: ChatProp[];
  buttonCreateChat: Button;
  attr: Record<string, string>;
};

export default class ListChats extends Block<ListChatsProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
