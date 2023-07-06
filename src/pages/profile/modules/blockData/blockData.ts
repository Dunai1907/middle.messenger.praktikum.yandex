import * as data from "../../components/data/data";
import styles from "./blockData.module.scss";

const blockData = document.createElement("div");
blockData.classList.add(styles.blockData_wrapper);

blockData.innerHTML = `
${data.email}
<hr class=${styles.line} />
${data.login}
<hr class=${styles.line} />
${data.firstName}
<hr class=${styles.line} />
${data.lastName}
<hr class=${styles.line} />
${data.chatsName}
<hr class=${styles.line} />
${data.phone}
`;

export default blockData;
