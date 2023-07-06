import avatar from "../../../components/avatar/avatar";
import groupSVG from "../../../../static/decor/group.svg";
import styles from "./changeData.module.scss";
import blockData from "./blockData/blockData";

const changeData = document.createElement("div");
changeData.classList.add(styles.changeData_wrapper);

changeData.innerHTML = `
<aside class=${styles.back}>
  <a href="/profile"}>
    <img src=${groupSVG}>
  </a>
</aside>
<section id="changeData" class=${styles.data}>
</section>
`;

const section = changeData.querySelector("#changeData");

section?.insertAdjacentHTML("afterbegin", avatar);

section?.insertAdjacentElement("beforeend", blockData);

export default changeData;
