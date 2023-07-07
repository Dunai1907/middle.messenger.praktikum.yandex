import avatar from "../../../../components/avatar/avatar";
import groupSVG from "../../../../../static/decor/group.svg";
import styles from "./changePassword.module.scss";
import blockPassword from "./blockPassword/blockPassword";

const changePassword = document.createElement("div");
changePassword.classList.add(styles.changeData_wrapper);

changePassword.innerHTML = `
<aside class=${styles.back}>
  <a href="/profile"}>
    <img src=${groupSVG}>
  </a>
</aside>
<section id="changePassword" class=${styles.data}>
</section>
`;

const section = changePassword.querySelector("#changePassword");

section?.insertAdjacentHTML("afterbegin", avatar);

section?.insertAdjacentElement("beforeend", blockPassword);

export default changePassword;
