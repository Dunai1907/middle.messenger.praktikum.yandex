import avatar from "../../components/avatar/avatar";
import groupSVG from "../../../static/decor/group.svg";
import styles from "./profile.module.scss";
import blockData from "./modules/blockData/blockData";
import blockAction from "./modules/blockAction/blockAction";

const name = "Иван";

const profile = document.createElement("div");
profile.classList.add(styles.profile_wrapper);

profile.innerHTML = `
<aside class=${styles.back}>
  <a href="/"}>
    <img src=${groupSVG}>
  </a>
</aside>
<section id="profile" class=${styles.data}>
</section>
`;

const section = profile.querySelector("#profile");

section?.insertAdjacentHTML("afterbegin", avatar);

section?.insertAdjacentHTML(
  "beforeend",
  `<div class=${styles.name}>${name}</div>`
);

section?.insertAdjacentElement("beforeend", blockData);

section?.insertAdjacentElement("beforeend", blockAction);

export default profile;
