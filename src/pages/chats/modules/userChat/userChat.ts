// import userData from "./userData/userData";
// import listMessages from "./listMessages/listMessages";
// import createMessage from "./createMessage/createMessage";
// import { windowActionsUser, windowUpload} from "../../components/windowActions/windowActions";
// import styles from "./userChat.module.scss";

// const userChat = document.createElement("section");
// userChat.classList.add(styles.user_chat);

// const line = `<hr class=${styles.line} />`;

// userChat.insertAdjacentElement("afterbegin", createMessage);
// userChat.insertAdjacentElement("afterbegin", windowUpload);
// userChat.insertAdjacentHTML("afterbegin", line);
// userChat.insertAdjacentElement("afterbegin", listMessages);
// userChat.insertAdjacentHTML("afterbegin", line);
// userChat.insertAdjacentElement("afterbegin", windowActionsUser);
// userChat.insertAdjacentElement("afterbegin", userData);
// // userChat.innerHTML = `
// // <div class=${styles.select_chat}>
// //   <span class=${styles.span_select_chat}>Выберите чат чтобы отправить сообщение</span>
// // <div/>`;

// export default userChat;

import tpl from "./userChat.tmpl";
import Block from "../../../../services/Block";

export default class UserChat extends Block {
  render() {
    return this._compile(tpl, this._props);
  }
}
