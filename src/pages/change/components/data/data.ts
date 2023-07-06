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
  name: "Почта",
  classValue: `${styles.input_value}`,
  type: "email",
  value: `${data.email}`,
});
export const login = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  name: "Логин",
  classValue: `${styles.input_value}`,
  type: "text",
  value: `${data.login}`,
});
export const firstName = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  name: "Имя",
  classValue: `${styles.input_value}`,
  type: "text",
  value: `${data.first_name}`,
});
export const lastName = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  name: "Фамилия",
  classValue: `${styles.input_value}`,
  type: "text",
  value: `${data.second_name}`,
});
export const chatsName = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  name: "Имя в чате",
  classValue: `${styles.input_value}`,
  type: "text",
  value: `${data.display_name}`,
});
export const phone = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  name: "Телефон",
  classValue: `${styles.input_value}`,
  type: "tel",
  value: `${data.phone}`,
});

export const oldPassword = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  name: "Старый пароль",
  classValue: `${styles.input_value}`,
  type: "password",
});
export const newPassword = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  name: "Новый пароль",
  classValue: `${styles.input_value}`,
  type: "password",
});
export const repeatPassword = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  name: "Повторите новый пароль",
  classValue: `${styles.input_value}`,
  type: "password",
});
