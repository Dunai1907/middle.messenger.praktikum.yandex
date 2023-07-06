import Handlebars from "handlebars";
import styles from "./button.module.scss";
import button from "./button.tmpl";

const template = Handlebars.compile(button);
const buttonBigLogin = template({
  classButton: `${styles.buttonBig}`,
  classSpan: `${styles.buttonBig_text}`,
  name: "Вход",
});

const buttonSmallLogin = template({
  classButton: `${styles.buttonSmall}`,
  classSpan: `${styles.buttonSmall_text}`,
  name: "Авторизоваться",
});

const buttonBigRegistration = template({
  classButton: `${styles.buttonBig}`,
  classSpan: `${styles.buttonBig_text}`,
  name: "Регистрация",
});

const buttonSmallRegistration = template({
  classButton: `${styles.buttonSmall}`,
  classSpan: `${styles.buttonSmall_text}`,
  name: "Зарегистрироваться",
});

export {
  buttonBigLogin,
  buttonSmallLogin,
  buttonBigRegistration,
  buttonSmallRegistration,
};
