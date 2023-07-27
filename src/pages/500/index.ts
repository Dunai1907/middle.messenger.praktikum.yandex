import ServerError from "./500";
import styles from "./500.module.scss";

const serverErrorPage = new ServerError("div", {
  classError: `${styles.error}`,
  classSpanError: `${styles.spanError}`,
  error: "500",
  classDescription: `${styles.description}`,
  classSpanDescription: `${styles.spanDescription}`,
  description: "Мы уже фиксим",
  classBack: `${styles.back}`,
  back: "Назад к чатам",
  attr: {
    class: `${styles.notFoundWrapper}`,
  },
});

export default serverErrorPage;
