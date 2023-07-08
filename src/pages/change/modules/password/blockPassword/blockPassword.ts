import {
  inputOldPassword,
  inputNewPassword,
  inputRepeatNewPassword,
} from "../../../../../components/input/input";
import styles from "./blockPassword.module.scss";

const blockPassword = document.createElement("form");
blockPassword.classList.add(styles.blockData_wrapper);

blockPassword.innerHTML = `
${inputOldPassword}
<hr class=${styles.line} />
${inputNewPassword}
<hr class=${styles.line} />
${inputRepeatNewPassword}
<button class=${styles.submit}>
  <span class=${styles.value}>Сохранить</span>
</button>`;

export default blockPassword;
