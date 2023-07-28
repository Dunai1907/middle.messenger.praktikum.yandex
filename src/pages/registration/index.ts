import Button from "../../components/button/button";
import Form from "../../components/form/form";
import Input from "../../components/input/input";
import Registration from "./registration";
import {
  isValidEmail,
  isValidLogin,
  isValidName,
  isValidPassword,
  isValidPhone,
} from "../../utils/validation";
import checkKeys from "../../utils/checkKeys";
import styles from "./registration.module.scss";

const requiredKeys = [
  "email",
  "login",
  "firstName",
  "secondName",
  "phone",
  "password",
  "repeatPassword",
];

const setError = (element: Record<string, any> , message: string) => {
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
  const phone: HTMLInputElement | null =
    document.querySelector('[name="phone"]');
  const password: HTMLInputElement | null =
    document.querySelector('[name="password"]');
  const repeatPassword: HTMLInputElement | null = document.querySelector(
    '[name="repeatPassword"]'
  );

  if (
    !email ||
    !login ||
    !firstName ||
    !secondName ||
    !phone ||
    !password ||
    !repeatPassword
  ) {
    return;
  }

  const emailValue = email.value.trim();
  const loginValue = login.value.trim();
  const firstNameValue = firstName.value.trim();
  const secondNameValue = secondName.value.trim();
  const phoneValue = phone.value.trim();
  const passwordValue = password.value.trim();
  const passwordRepeatValue = repeatPassword.value.trim();

  let data = {};

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Validation error");
  } else {
    setSuccess(email);
    data = Object.assign(data, { email: emailValue });
  }

  if (loginValue === "") {
    setError(login, "Login is required");
  } else if (!isValidLogin(loginValue)) {
    setError(login, "Validation error");
  } else {
    setSuccess(login);
    data = Object.assign(data, { login: loginValue });
  }

  if (firstNameValue === "") {
    setError(firstName, "It's required");
  } else if (!isValidName(firstNameValue)) {
    setError(firstName, "Validation error");
  } else {
    setSuccess(firstName);
    data = Object.assign(data, { firstName: firstNameValue });
  }

  if (secondNameValue === "") {
    setError(secondName, "It's required");
  } else if (!isValidName(secondNameValue)) {
    setError(secondName, "Validation error");
  } else {
    setSuccess(secondName);
    data = Object.assign(data, { secondName: secondNameValue });
  }

  if (phoneValue === "") {
    setError(phone, "Phone required");
  } else if (!isValidPhone(phoneValue)) {
    setError(phone, "Validation error");
  } else {
    setSuccess(phone);
    data = Object.assign(data, { phone: phoneValue });
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (!isValidPassword(passwordValue)) {
    setError(password, "Validation error");
  } else {
    setSuccess(password);
    data = Object.assign(data, { password: passwordValue });
  }

  if (passwordRepeatValue === "") {
    setError(repeatPassword, "Password is required");
  } else if (passwordRepeatValue !== passwordValue) {
    setError(repeatPassword, "Пароли не совпадают");
  } else {
    setSuccess(repeatPassword);
    data = Object.assign(data, { repeatPassword: passwordRepeatValue });
  }

  return data;
};

const inputBlur = () => {
  validateInputs();
};

const registrationForm = (event: SubmitEvent) => {
  event.preventDefault();
  validateInputs();
  const data = validateInputs();
  console.log("data <-------", data);
  const checkData: boolean = checkKeys(data, requiredKeys);
  if (!checkData) {
    console.log("need validate <-------");
  } else {
    console.log("good <-------");
  }
};

const buttonBig = new Button("button", {
  classSpan: `${styles.buttonBigText}`,
  name: "Регистрация",
  attr: {
    type: "submit",
    class: `${styles.buttonBig}`,
  },
});

const buttonSmall = new Button("button", {
  classSpan: `${styles.buttonSmallText}`,
  name: "Зарегистрироваться",
  attr: {
    type: "submit",
    class: `${styles.buttonSmall}`,
  },
});

const inputEmail = new Input("div", {
  classLabel: `${styles.textLabel}`,
  labelName: "Почта",
  classInput: `${styles.input}`,
  type: "email",
  inputName: "email",
  classLine: `${styles.line}`,
  classError: `${styles.error}`,
  attr: {
    class: `${styles.inputControl}`,
  },
  events: {
    blur: inputBlur,
  },
});

const inputLogin = new Input("div", {
  classLabel: `${styles.textLabel}`,
  labelName: "Логин",
  classInput: `${styles.input}`,
  type: "text",
  inputName: "login",
  classLine: `${styles.line}`,
  classError: `${styles.error}`,
  attr: {
    class: `${styles.inputControl}`,
  },
  events: {
    blur: inputBlur,
  },
});

const inputFirstName = new Input("div", {
  classLabel: `${styles.textLabel}`,
  labelName: "Имя",
  classInput: `${styles.input}`,
  type: "text",
  inputName: "first_name",
  classLine: `${styles.line}`,
  classError: `${styles.error}`,
  attr: {
    class: `${styles.inputControl}`,
  },
  events: {
    blur: inputBlur,
  },
});

const inputSecondName = new Input("div", {
  classLabel: `${styles.textLabel}`,
  labelName: "Фамилия",
  classInput: `${styles.input}`,
  type: "text",
  inputName: "second_name",
  classLine: `${styles.line}`,
  classError: `${styles.error}`,
  attr: {
    class: `${styles.inputControl}`,
  },
  events: {
    blur: inputBlur,
  },
});

const inputPhone = new Input("div", {
  classLabel: `${styles.textLabel}`,
  labelName: "Телефон",
  classInput: `${styles.input}`,
  type: "tel",
  inputName: "phone",
  classLine: `${styles.line}`,
  classError: `${styles.error}`,
  attr: {
    class: `${styles.inputControl}`,
  },
  events: {
    blur: inputBlur,
  },
});

const inputPassword = new Input("div", {
  classLabel: `${styles.textLabel}`,
  labelName: "Пароль",
  classInput: `${styles.input}`,
  type: "password",
  inputName: "password",
  classLine: `${styles.line}`,
  classError: `${styles.error}`,
  attr: {
    class: `${styles.inputControl}`,
  },
  events: {
    blur: inputBlur,
  },
});

const inputRepeatPassword = new Input("div", {
  classLabel: `${styles.textLabel}`,
  labelName: "Пароль (ещё раз)",
  classInput: `${styles.input}`,
  type: "password",
  inputName: "repeatPassword",
  classLine: `${styles.line}`,
  classError: `${styles.error}`,
  attr: {
    class: `${styles.inputControl}`,
  },
  events: {
    blur: inputBlur,
  },
});

const form = new Form("form", {
  buttonBig,
  inputEmail,
  inputLogin,
  inputFirstName,
  inputSecondName,
  inputPhone,
  inputPassword,
  inputRepeatPassword,
  buttonSmall,
  events: {
    submit: registrationForm,
  },
  attr: {
    class: `${styles.form}`,
  },
});

const registrationPage = new Registration("section", {
  className: `${styles.formBlock}`,
  form,
  url: "/login",
  title: "Войти",
  attr: {
    class: `${styles.regisrationWrapper}`,
  },
});

export default registrationPage;
