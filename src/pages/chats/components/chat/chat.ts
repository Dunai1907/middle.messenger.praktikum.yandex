import tpl from "./chat.tmpl";
import Block from "../../../../services/Block";
import { ChatProps } from "./types";
import styles from "./chat.module.scss";
import fotoSVG from "../../../../../static/decor/foto.svg";
import store from "../../../../services/Store";
import ChatsController from "../../../../controllers/chats";
import formatDateForChat from "../../../../utils/formatDateForChat";

export default class Chat extends Block<ChatProps> {
  private _chatsController = new ChatsController();

  constructor(chat: any) {
    const avatar = chat.avatar ? `${chat.avatar}` : `${fotoSVG}`;

    const date = chat.last_message
      ? formatDateForChat(chat.last_message?.time)
      : "";
    const isUnreadCount = chat.unread_count !== 0 ? true : false;
    const isLastMessage = !chat.last_message?.user ? false : true;
    const props = new ChatProps();
    (props.chatId = `${chat.id}`),
      (props.stylesChat = `${styles.chat}`),
      (props.stylesAvatar = `${styles.avatar}`),
      (props.avatar = `${avatar}`),
      (props.stylesMain = `${styles.main}`),
      (props.stylesWrap = `${styles.wrap}`),
      (props.stylesName = `${styles.name}`),
      (props.stylesSpanName = `${styles.spanName}`),
      (props.name = `${chat.title}`),
      (props.stylesDate = `${styles.date}`),
      (props.stylesSpanDate = `${styles.spanDate}`),
      (props.date = `${date}`),
      (props.stylesText = `${styles.text}`),
      (props.stylesSpanText = `${styles.spanText}`),
      (props.text = `${chat.last_message?.content}`),
      (props.isUnreadCount = isUnreadCount),
      (props.isLastMessage = isLastMessage),
      (props.stylesNumber = `${styles.number}`),
      (props.stylesSpanNumber = `${styles.spanNumber}`),
      (props.number = `${chat.unread_count}`),
      (props.attr = {
        class: `${styles.chat}`,
      }),
      (props.events = {
        click: () => this.selectChat(chat),
      }),
      super("div", props);
  }

  selectChat(chat: any) {
    this._chatsController.selectedChat(chat);
    store.set("selectedChat", chat);
  }

  render() {
    return this._compile(tpl, this._props);
  }
}
