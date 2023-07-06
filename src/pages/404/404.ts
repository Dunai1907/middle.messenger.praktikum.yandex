import styles from "./404.module.scss";

const notFound = document.createElement("div");
notFound.classList.add(styles.notFound_wrapper);
notFound.innerHTML = `
<div class=${styles.text1}>
  <span class=${styles.span_text1}>404</span>
</div>
<div class=${styles.text2}>
  <span class=${styles.span_text2}>Не туда попали</span>
</div>
<div >
  <a href="/" class=${styles.a_text3}>Назад к чатам</a>
</div>
`;

export default notFound;
