import * as data from "../../../../../components/input/input";
import styles from "./blockData.module.scss";

const blockData = document.createElement("form");
blockData.classList.add(styles.blockData_wrapper);

blockData.innerHTML = `
${data.inputChangeEmail}
<hr class=${styles.line} />
${data.inputChangeLogin}
<hr class=${styles.line} />
${data.inputChangeFirstName}
<hr class=${styles.line} />
${data.inputChangeLastName}
<hr class=${styles.line} />
${data.inputChangeChatsName}
<hr class=${styles.line} />
${data.inputChangePhone}
<button class=${styles.submit}>
 <span class=${styles.value}>Сохранить</span>
</button>
`;

export default blockData;
