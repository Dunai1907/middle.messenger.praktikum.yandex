import styles from "./userChat.module.scss";

const userChat = document.createElement("section");
userChat.classList.add(styles.user_chat);
userChat.innerHTML = `
<div class=${styles.select_chat}>
  <span class=${styles.span_select_chat}>Выберите чат чтобы отправить сообщение</span>
<div/>`;

export default userChat;
