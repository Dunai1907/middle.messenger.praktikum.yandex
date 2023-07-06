import * as data from "../../components/data/data";
import styles from "./blockPassword.module.scss";

const blockPassword = document.createElement("form");
blockPassword.classList.add(styles.blockData_wrapper);

blockPassword.innerHTML = `
${data.newPassword}
<hr class=${styles.line} />
${data.oldPassword}
<hr class=${styles.line} />
${data.repeatPassword}
<button

class=${styles.submit}
>
<span class=${styles.value}>Сохранить</span>
</button>
`;

export default blockPassword;
