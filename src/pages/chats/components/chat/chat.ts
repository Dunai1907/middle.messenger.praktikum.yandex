import tpl from "./chat.tmpl";
import Block from "../../../../services/Block";
// import Button from "../../../../components/button/button";

type ChatProps = {
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
  dataName: string;
  chatId?: string;
  attr: Record<string, string>;
  events?: {
    // eslint-disable-next-line no-unused-vars
    click: (event: any) => void;
  };
};

export default class Chat extends Block<ChatProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
