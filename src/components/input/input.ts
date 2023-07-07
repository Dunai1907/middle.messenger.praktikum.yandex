import Handlebars from "handlebars";
import styles from "./input.module.scss";
import input from "./input.tmpl";

const template = Handlebars.compile(input);
const inputLogin = template({
  classLabel: `${styles.text_label}`,
  labelName: "Логин",
  classInput: `${styles.input}`,
  type: "text",
  inputName: "login",
});
const inputPassword = template({
  classLabel: `${styles.text_label}`,
  labelName: "Пароль",
  classInput: `${styles.input}`,
  type: "password",
  inputName: "password",
});
const inputRepeatPassword = template({
  classLabel: `${styles.text_label}`,
  labelName: "Пароль (ещё раз)",
  classInput: `${styles.input}`,
  type: "password",
  inputName: "password",
});
const inputEmail = template({
  classLabel: `${styles.text_label}`,
  labelName: "Почта",
  classInput: `${styles.input}`,
  type: "email",
  inputName: "email",
});
const inputFirstName = template({
  classLabel: `${styles.text_label}`,
  labelName: "Имя",
  classInput: `${styles.input}`,
  type: "text",
  inputName: "first_name",
});
const inputLastName = template({
  classLabel: `${styles.text_label}`,
  labelName: "Фамилия",
  classInput: `${styles.input}`,
  type: "text",
  inputName: "second_name",
});
const inputPhone = template({
  classLabel: `${styles.text_label}`,
  labelName: "Телефон",
  classInput: `${styles.input}`,
  type: "tel",
  inputName: "phone",
});

export {
  inputLogin,
  inputPassword,
  inputRepeatPassword,
  inputEmail,
  inputFirstName,
  inputLastName,
  inputPhone,
};
