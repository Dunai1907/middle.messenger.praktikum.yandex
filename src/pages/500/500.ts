import styles from "./500.module.scss";

const serverError = document.createElement("div");
serverError.classList.add(styles.notFound_wrapper);
serverError.innerHTML = `
<div class=${styles.text1}>
  <span class=${styles.span_text1}>500</span>
</div>
<div class=${styles.text2}>
  <span class=${styles.span_text2}>Мы уже фиксим</span>
</div>
<div >
  <a href="/" class=${styles.a_text3}>Назад к чатам</a>
</div>
`;

export default serverError;
