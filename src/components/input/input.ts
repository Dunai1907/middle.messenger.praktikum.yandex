import Handlebars from "handlebars";
import input from "./input.tmpl";
import styles from "./input.module.scss";

const data = {
  email: "pochta@yandex.ru",
  login: "ivanivanov",
  first_name: "Иван",
  second_name: "Иванов",
  display_name: "Иван",
  phone: "+7(909)9673030",
};

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

const inputChangeEmail = template({
  classLabel: `${styles.change_lable}`,
  labelName: "Почта",
  classInput: `${styles.change_input}`,
  type: "email",
  inputName: "email",
  value: `${data.email}`,
});

const inputChangeLogin = template({
  classLabel: `${styles.change_lable}`,
  labelName: "Логин",
  classInput: `${styles.change_input}`,
  type: "text",
  inputName: "login",
  value: `${data.login}`,
});

const inputChangeFirstName = template({
  classLabel: `${styles.change_lable}`,
  labelName: "Имя",
  classInput: `${styles.change_input}`,
  type: "text",
  inputName: "first_name",
  value: `${data.first_name}`,
});

const inputChangeLastName = template({
  classLabel: `${styles.change_lable}`,
  labelName: "Фамилия",
  classInput: `${styles.change_input}`,
  type: "text",
  inputName: "second_name",
  value: `${data.second_name}`,
});

const inputChangeChatsName = template({
  classLabel: `${styles.change_lable}`,
  labelName: "Имя в чате",
  classInput: `${styles.change_input}`,
  type: "text",
  inputName: "display_name",
  value: `${data.display_name}`,
});

const inputChangePhone = template({
  classLabel: `${styles.change_lable}`,
  labelName: "Телефон",
  classInput: `${styles.change_input}`,
  type: "tel",
  value: `${data.phone}`,
  inputName: "phone",
});

const inputOldPassword = template({
  classLabel: `${styles.change_lable}`,
  labelName: "Старый пароль",
  classInput: `${styles.change_input}`,
  type: "password",
  inputName: "oldPassword",
});

const inputNewPassword = template({
  classLabel: `${styles.change_lable}`,
  labelName: "Новый пароль",
  classInput: `${styles.change_input}`,
  type: "password",
  inputName: "newPassword",
});

const inputRepeatNewPassword = template({
  classLabel: `${styles.change_lable}`,
  labelName: "Повторите новый пароль",
  classInput: `${styles.change_input}`,
  type: "password",
  inputName: "newPassword",
});

export {
  inputLogin,
  inputPassword,
  inputRepeatPassword,
  inputEmail,
  inputFirstName,
  inputLastName,
  inputPhone,
  inputChangeEmail,
  inputChangeLogin,
  inputChangeFirstName,
  inputChangeLastName,
  inputChangeChatsName,
  inputChangePhone,
  inputOldPassword,
  inputNewPassword,
  inputRepeatNewPassword,
};
