import Handlebars from "handlebars";
import styles from "./data.module.scss";
import dataModel from "./data.tmpl";

const data = {
  email: "pochta@yandex.ru",
  login: "ivanivanov",
  firstName: "Иван",
  lastName: "Иванов",
  chatsName: "Иван",
  phone: "+7 (909) 967 30 30",
};

const template = Handlebars.compile(dataModel);

export const email = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  name: "Почта",
  classValue: `${styles.span_value}`,
  value: `${data.email}`,
});
export const login = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  name: "Логин",
  classValue: `${styles.span_value}`,
  value: `${data.login}`,
});
export const firstName = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  name: "Имя",
  classValue: `${styles.span_value}`,
  value: `${data.firstName}`,
});
export const lastName = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  name: "Фамилия",
  classValue: `${styles.span_value}`,
  value: `${data.lastName}`,
});
export const chatsName = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  name: "Имя в чате",
  classValue: `${styles.span_value}`,
  value: `${data.chatsName}`,
});
export const phone = template({
  classWrapper: `${styles.data_wrapper}`,
  className: `${styles.span_name}`,
  name: "Телефон",
  classValue: `${styles.span_value}`,
  value: `${data.phone}`,
});
