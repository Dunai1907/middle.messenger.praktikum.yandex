import styles from "./blockAction.module.scss";

const blockAction = document.createElement("div");
blockAction.classList.add(styles.blockAction_wrapper);

blockAction.innerHTML = `
<a class="${styles.action} ${styles.mediumBlue}" href='/changeData'>Изменить данные</a>
<hr class=${styles.line} />
<a class="${styles.action} ${styles.mediumBlue}" href='/changePassword'>Изменить пароль</a>
<hr class=${styles.line} />
<a class="${styles.action} ${styles.red}" href='/'>Выход</a>
`;

export default blockAction;
