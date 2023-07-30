import Button from "../../components/button/button";
import Form from "../../components/form/form";
import Input from "../../components/input/input";
import Login from "./login";
import { isValidLogin, isValidPassword } from "../../utils/validation";
import checkKeys from "../../utils/checkKeys";
import styles from "./login.module.scss";

const requiredKeys = ["login", "password"];

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
  const login: HTMLInputElement | null =
    document.querySelector('[name="login"]');
  const password: HTMLInputElement | null =
    document.querySelector('[name="password"]');

  if (!login || !password) {
    return;
  }

  const loginValue = login.value.trim();
  const passwordValue = password.value.trim();

  let data: Record<string, string> = {};

  if (loginValue === "") {
    setError(login, "Login is required");
  } else if (!isValidLogin(loginValue)) {
    setError(login, "Validation error");
  } else {
    setSuccess(login);
    data = Object.assign(data, { login: loginValue });
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (!isValidPassword(passwordValue)) {
    setError(password, "Validation error");
  } else {
    setSuccess(password);
    data = Object.assign(data, { password: passwordValue });
  }

  return data;
};

const inputBlur = () => {
  validateInputs();
};

const loginForm = (event: SubmitEvent) => {
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
  } else {
    console.log("good <-------");
  }
};

const buttonBig = new Button("button", {
  classSpan: `${styles.buttonBigText}`,
  name: "Вход",
  attr: {
    type: "submit",
    class: `${styles.buttonBig}`,
  },
});

const buttonSmall = new Button("button", {
  classSpan: `${styles.buttonSmallText}`,
  name: "Авторизоваться",
  attr: {
    type: "submit",
    class: `${styles.buttonSmall}`,
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

const form = new Form("form", {
  buttonBig,
  inputLogin,
  inputPassword,
  buttonSmall,
  events: {
    submit: loginForm,
  },
  attr: {
    class: `${styles.form}`,
  },
});

const loginPage = new Login("section", {
  className: `${styles.formBlock}`,
  form,
  url: "/registration",
  title: "Нет аккаунта?",
  attr: {
    class: `${styles.loginWrapper}`,
  },
});

export default loginPage;
