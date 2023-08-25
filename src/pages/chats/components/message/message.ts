import tpl from "./message.tmpl";
import { MessageProps } from "./types";
import styles from "./message.module.scss";
import Block from "../../../../services/Block";
import store from "../../../../services/Store";

export default class Message extends Block<MessageProps> {
  constructor(message: any) {
    const userId = store.getState()["userData"].id;
    const isAuthor = message.user_id === userId ? true : false;
    const style = isAuthor ? `${styles.messageRight}` : `${styles.message}`;

    const props = new MessageProps();
    (props.classContent = `${styles.content}`),
      (props.content = `${message.content}`),
      (props.attr = {
        class: `${style}`,
      }),
      super("div", props);
  }

  render() {
    return this._compile(tpl, this._props);
  }
}
