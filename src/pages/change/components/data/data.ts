import Handlebars from "handlebars";
import styles from "./data.module.scss";
import dataModel from "./data.tmpl";

const data = {
  email: "pochta@yandex.ru",
  login: "ivanivanov",
  first_name: "Иван",
  second_name: "Иванов",
  display_name: "Иван",
  phone: "+7(909)9673030",
};

const template = Handlebars.compile(dataModel);

export const email = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  spanName: "Почта",
  classValue: `${styles.input_value}`,
  type: "email",
  value: `${data.email}`,
  inputName: "email",
});
export const login = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  spanName: "Логин",
  classValue: `${styles.input_value}`,
  type: "text",
  value: `${data.login}`,
  inputName: "login",
});
export const firstName = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  spanName: "Имя",
  classValue: `${styles.input_value}`,
  type: "text",
  value: `${data.first_name}`,
  inputName: "first_name",
});
export const lastName = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  spanName: "Фамилия",
  classValue: `${styles.input_value}`,
  type: "text",
  value: `${data.second_name}`,
  inputName: "second_name",
});
export const chatsName = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  spanName: "Имя в чате",
  classValue: `${styles.input_value}`,
  type: "text",
  value: `${data.display_name}`,
  inputName: "display_name",
});
export const phone = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  spanName: "Телефон",
  classValue: `${styles.input_value}`,
  type: "tel",
  value: `${data.phone}`,
  inputName: "phone",
});

export const oldPassword = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  spanName: "Старый пароль",
  classValue: `${styles.input_value}`,
  type: "password",
  inputName: "oldPassword",
});

export const newPassword = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  spanName: "Новый пароль",
  classValue: `${styles.input_value}`,
  type: "password",
  inputName: "newPassword",
});

export const repeatPassword = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  spanName: "Повторите новый пароль",
  classValue: `${styles.input_value}`,
  type: "password",
  inputName: "newPassword",
});
