import styles from "./chats.module.scss";
import arrChat from "./modules/chat/chat";
import listChats from "./modules/listChats/listChats";
import userChat from "./modules/userChat/userChat";

const chats = document.createElement("main");
chats.classList.add(styles.chats_wrapper);
chats.append(listChats);

const form = chats.querySelector("#search");

arrChat.reverse().forEach((item) => {
  form?.insertAdjacentHTML("afterend", `${item}`);
});

chats.append(userChat);

export default chats;
