import profileSVG from "../../../../../static/decor/profile.svg";
import searchSVG from "../../../../../static/decor/search.svg";
import styles from "./listChats.module.scss";

const listChats = document.createElement("aside");
listChats.classList.add(styles.list_chats);
listChats.innerHTML = `
<a href="/profile" class=${styles.buttonProfile}>
  <img src=${profileSVG}>
</a>
<form id="search"
  class=${styles.form}
>
  <img src=${searchSVG}>
  <input placeholder="поиск" class=${styles.search} type="search"/>
</form>`;

export default listChats;
