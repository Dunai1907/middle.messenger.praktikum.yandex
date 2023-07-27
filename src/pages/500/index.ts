import ServerError from "./500";
import styles from "./500.module.scss";

const serverErrorPage = new ServerError("div", {
  classError: `${styles.error}`,
  classSpanError: `${styles.span_error}`,
  error: "500",
  classDescription: `${styles.description}`,
  classSpanDescription: `${styles.span_description}`,
  description: "Мы уже фиксим",
  classBack: `${styles.back}`,
  back: "Назад к чатам",
  attr: {
    class: `${styles.notFound_wrapper}`,
  },
});

export default serverErrorPage;
