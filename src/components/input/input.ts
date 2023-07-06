import Handlebars from "handlebars";
import styles from "./input.module.scss";
import input from "./input.tmpl";

const template = Handlebars.compile(input);
const inputLogin = template({
  classLabel: `${styles.text_label}`,
  name: "Логин",
  classInput: `${styles.input}`,
  type: "text",
});
const inputPassword = template({
  classLabel: `${styles.text_label}`,
  name: "Пароль",
  classInput: `${styles.input}`,
  type: "password",
});
const inputRepeatPassword = template({
  classLabel: `${styles.text_label}`,
  name: "Пароль (ещё раз)",
  classInput: `${styles.input}`,
  type: "password",
});
const inputEmail = template({
  classLabel: `${styles.text_label}`,
  name: "Почта",
  classInput: `${styles.input}`,
  type: "email",
});
const inputFirstName = template({
  classLabel: `${styles.text_label}`,
  name: "Имя",
  classInput: `${styles.input}`,
  type: "text",
});
const inputLastName = template({
  classLabel: `${styles.text_label}`,
  name: "Фамилия",
  classInput: `${styles.input}`,
  type: "text",
});
const inputPhone = template({
  classLabel: `${styles.text_label}`,
  name: "Телефон",
  classInput: `${styles.input}`,
  type: "tel",
});

export { inputLogin, inputPassword, inputRepeatPassword, inputEmail, inputFirstName, inputLastName, inputPhone };
