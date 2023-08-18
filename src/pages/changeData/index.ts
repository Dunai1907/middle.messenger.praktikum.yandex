import ChangeData from "./changeData";
import Avatar from "../../components/avatar/avatar";
import arrowLeftSVG from "../../../static/decor/arrowLeft.svg";
import unionSVG from "../../../static/decor/union.svg";
import styles from "./changeData.module.scss";
import ChangeBlockData from "./blockData/blockData";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import checkKeys from "../../utils/checkKeys";
import {
  isValidEmail,
  isValidLogin,
  isValidName,
  isValidPhone,
} from "../../utils/validation";
import GoBack from "../../components/goBack/goBack";
import UsersController from "../../controllers/users";
import { ChangeUserProfileFormModel } from "../../types/file";

const usersController = new UsersController();

const data = {
  email: "pochta@yandex.ru",
  login: "ivanivanov",
  firstName: "Ivan",
  secondName: "Ivanod",
  display_name: "Dunai",
  phone: "+375295872088",
};

const requiredKeys = [
  "email",
  "login",
  "first_name",
  "second_name",
  "display_name",
  "phone",
];

const setError = (element: Record<string, any>, message: string) => {
  const inputControl = element.parentElement.parentElement;
  const errorDisplay = inputControl.querySelector('[data-name="error"]');

  errorDisplay.innerText = message;
  element.classList.add(`${styles.errorBorder}`);
};

const setSuccess = (element: Record<string, any>) => {
  const inputControl = element.parentElement.parentElement;
  const errorDisplay = inputControl.querySelector('[data-name="error"]');

  errorDisplay.innerText = "";
  element.classList.remove(`${styles.errorBorder}`);
};

const validateInputs = () => {
  const email: HTMLInputElement | null =
    document.querySelector('[name="email"]');
  const login: HTMLInputElement | null =
    document.querySelector('[name="login"]');
  const firstName: HTMLInputElement | null = document.querySelector(
    '[name="first_name"]'
  );
  const secondName: HTMLInputElement | null = document.querySelector(
    '[name="second_name"]'
  );
  const displayName: HTMLInputElement | null = document.querySelector(
    '[name="display_name"]'
  );
  const phone: HTMLInputElement | null =
    document.querySelector('[name="phone"]');

  if (!email || !login || !firstName || !secondName || !displayName || !phone) {
    return;
  }

  const emailValue = email.value.trim();
  const loginValue = login.value.trim();
  const firstNameValue = firstName.value.trim();
  const secondNameValue = secondName.value.trim();
  const displayNameValue = displayName.value.trim();
  const phoneValue = phone.value.trim();

  let data: Record<string, string> = {};

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(
      email,
      "латиница, может включать цифры и спецсимволы,\
     обязательно должна быть @ и точка после неё."
    );
  } else {
    setSuccess(email);
    data = Object.assign(data, { email: emailValue });
  }

  if (loginValue === "") {
    setError(login, "Login is required");
  } else if (!isValidLogin(loginValue)) {
    setError(
      login,
      "от 3 до 20 символов, латиница, может содержать цифры, \
    (допустимы дефис и нижнее подчёркивание)"
    );
  } else {
    setSuccess(login);
    data = Object.assign(data, { login: loginValue });
  }

  if (firstNameValue === "") {
    setError(firstName, "It's required");
  } else if (!isValidName(firstNameValue)) {
    setError(
      firstName,
      "Латиница или кириллица, первая буква должна быть заглавной,\
    без пробелов и без цифр, нет спецсимволов (допустим только дефис)"
    );
  } else {
    setSuccess(firstName);
    data = Object.assign(data, { first_name: firstNameValue });
  }

  if (secondNameValue === "") {
    setError(secondName, "It's required");
  } else if (!isValidName(secondNameValue)) {
    setError(
      secondName,
      "Латиница или кириллица, первая буква должна быть заглавной,\
    без пробелов и без цифр, нет спецсимволов (допустим только дефис)"
    );
  } else {
    setSuccess(secondName);
    data = Object.assign(data, { second_name: secondNameValue });
  }

  if (displayNameValue === "") {
    setError(displayName, "It's required");
  } else if (!isValidName(displayNameValue)) {
    setError(
      displayName,
      "Латиница или кириллица, первая буква должна быть заглавной,\
    без пробелов и без цифр, нет спецсимволов (допустим только дефис)"
    );
  } else {
    setSuccess(displayName);
    data = Object.assign(data, { display_name: displayNameValue });
  }

  if (phoneValue === "") {
    setError(phone, "Phone required");
  } else if (!isValidPhone(phoneValue)) {
    setError(
      phone,
      "от 10 до 15 символов, состоит из цифр, может начинается с плюса."
    );
  } else {
    setSuccess(phone);
    data = Object.assign(data, { phone: phoneValue });
  }

  return data;
};

const inputBlur = () => {
  validateInputs();
};

const changeDataForm = (event: SubmitEvent) => {
  event.preventDefault();
  validateInputs();
  const data = validateInputs();

  if (!data) {
    return;
  }

  console.log("data <-------", data);
  const checkData: boolean = checkKeys(data, requiredKeys);
  if (!checkData) {
    console.log("need validate <-------");
    return;
  }

  usersController.changeUserProfile(data as ChangeUserProfileFormModel);
};

const goBack = new GoBack("aside", {
  url: "/settings",
  arrowLeftSVG: `${arrowLeftSVG}`,
  attr: {
    class: `${styles.back}`,
  },
});

const avatar = new Avatar("div", {
  unionSVG: `${unionSVG}`,
  attr: {
    class: `${styles.avatar}`,
  },
});

const changeEmail = new Input("div", {
  classLabel: `${styles.changeLable}`,
  labelName: "Почта",
  classInput: `${styles.changeInput}`,
  type: "email",
  inputName: "email",
  value: `${data.email}`,
  classLine: `${styles.lineNone}`,
  classError: `${styles.error}`,
  attr: {
    class: `${styles.inputControl}`,
  },
  events: {
    blur: inputBlur,
  },
});

const changeLogin = new Input("div", {
  classLabel: `${styles.changeLable}`,
  labelName: "Логин",
  classInput: `${styles.changeInput}`,
  type: "text",
  inputName: "login",
  value: `${data.login}`,
  classLine: `${styles.lineNone}`,
  classError: `${styles.error}`,
  attr: {
    class: `${styles.inputControl}`,
  },
  events: {
    blur: inputBlur,
  },
});

const changeFirstName = new Input("div", {
  classLabel: `${styles.changeLable}`,
  labelName: "Имя",
  classInput: `${styles.changeInput}`,
  type: "text",
  inputName: "first_name",
  value: `${data.firstName}`,
  classLine: `${styles.lineNone}`,
  classError: `${styles.error}`,
  attr: {
    class: `${styles.inputControl}`,
  },
  events: {
    blur: inputBlur,
  },
});

const changeSecondName = new Input("div", {
  classLabel: `${styles.changeLable}`,
  labelName: "Фамилия",
  classInput: `${styles.changeInput}`,
  type: "text",
  inputName: "second_name",
  value: `${data.secondName}`,
  classLine: `${styles.lineNone}`,
  classError: `${styles.error}`,
  attr: {
    class: `${styles.inputControl}`,
  },
  events: {
    blur: inputBlur,
  },
});

const changeChatsName = new Input("div", {
  classLabel: `${styles.changeLable}`,
  labelName: "Имя в чате",
  classInput: `${styles.changeInput}`,
  type: "text",
  inputName: "display_name",
  value: `${data.display_name}`,
  classLine: `${styles.lineNone}`,
  classError: `${styles.error}`,
  attr: {
    class: `${styles.inputControl}`,
  },
  events: {
    blur: inputBlur,
  },
});

const changePhone = new Input("div", {
  classLabel: `${styles.changeLable}`,
  labelName: "Телефон",
  classInput: `${styles.changeInput}`,
  type: "tel",
  inputName: "phone",
  value: `${data.phone}`,
  classLine: `${styles.lineNone}`,
  classError: `${styles.error}`,
  attr: {
    class: `${styles.inputControl}`,
  },
  events: {
    blur: inputBlur,
  },
});

const buttonSubmit = new Button("button", {
  name: "Сохранить",
  attr: {
    type: "submit",
    class: `${styles.submit}`,
  },
});

const blockData = new ChangeBlockData("form", {
  classLine: `${styles.line}`,
  changeEmail,
  changeLogin,
  changeFirstName,
  changeSecondName,
  changeChatsName,
  changePhone,
  buttonSubmit,
  events: {
    submit: changeDataForm,
  },
  attr: {
    class: `${styles.blockData}`,
  },
});

const changeDataPage = new ChangeData("div", {
  goBack,
  classData: `${styles.data}`,
  avatar,
  blockData,
  attr: {
    class: `${styles.changeDataWrapper}`,
  },
});

export default changeDataPage;
