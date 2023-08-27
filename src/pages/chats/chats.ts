import tpl from "./chats.tmpl";
import Block from "../../services/Block";
import ModalWindow from "./components/modalWindow/modalWindow";
import ListChats from "./modules/listChats/listChats";
import UserChat from "./modules/userChat/userChat";
import styles from "./chats.module.scss";
import Button from "../../components/button/button";
import { ChatsPageProps } from "./types";

export default class ChatsPage extends Block<ChatsPageProps> {
  constructor() {
    const props = new ChatsPageProps();

    props.modalWindowAdd = new ModalWindow("div", {
      classContent: `${styles.modalContent}`,
      classSpan: `${styles.spanModalWindow}`,
      name: "Добавить пользователя",
      dataName: "addUser_modal",
      classLabel: `${styles.labelModalWindow}`,
      labelName: "login",
      inputType: "text",
      inputName: "addNewUser",
      classInput: `${styles.inputModalWindow}`,
      classLine: `${styles.line}`,
      buttonAction: new Button("button", {
        classSpan: `${styles.buttonText}`,
        name: "Добавить",
        attr: {
          class: `${styles.buttonModalWindow}`,
          type: "submit",
        },
      }),
      attr: {
        class: `${styles.modalWindowH}`,
        "data-name": "modalWindowAdd",
      },
    });
    (props.modalWindowDelete = new ModalWindow("div", {
      classContent: `${styles.modalContent}`,
      classSpan: `${styles.spanModalWindow}`,
      name: "Удалить пользователя",
      dataName: "deleteUser_modal",
      classLabel: `${styles.labelModalWindow}`,
      labelName: "login",
      inputType: "text",
      inputName: "deleteUser",
      classInput: `${styles.inputModalWindow}`,
      classLine: `${styles.line}`,
      buttonAction: new Button("button", {
        classSpan: `${styles.buttonText}`,
        name: "Удалить",
        attr: {
          class: `${styles.buttonModalWindow}`,
          type: "submit",
        },
      }),
      attr: {
        class: `${styles.modalWindowH}`,
        "data-name": "modalWindowDelete",
      },
    })),
      (props.listChats = new ListChats()),
      (props.userChat = new UserChat());
    props.attr = {
      class: `${styles.chatsWrapper}`,
    };
    super("section", props);
  }

  render() {
    return this._compile(tpl, this._props);
  }
}
