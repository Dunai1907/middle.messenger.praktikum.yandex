import NotFound from "./404";
import styles from "./404.module.scss";

const notFoundPage = new NotFound("div", {
  classError: `${styles.error}`,
  classSpanError: `${styles.spanError}`,
  error: "404",
  classDescription: `${styles.description}`,
  classSpanDescription: `${styles.spanDescription}`,
  description: "Не туда попали",
  classBack: `${styles.back}`,
  back: "Назад к чатам",
  attr: {
    class: `${styles.notFoundWrapper}`,
  },
});

export default notFoundPage;
