import tpl from "./login.tmpl";
import Block from "../../services/Block";
import { LoginProps } from "./types";
import Button from "../../components/button/button";
import Form from "../../components/form/form";
import Input from "../../components/input/input";
import { isValidLogin, isValidPassword } from "../../utils/validation";
import checkKeys from "../../utils/checkKeys";
import styles from "./login.module.scss";
import AuthController from "../../controllers/auth";
import { LoginFormModel } from "../../types/file";

export default class Login extends Block<LoginProps> {
  private _requiredKeys = ["login", "password"];
  private _authController = new AuthController();

  constructor() {
    const props = new LoginProps();
    (props.className = `${styles.formBlock}`),
      (props.form = new Form("form", {
        buttonBig: new Button("button", {
          classSpan: `${styles.buttonBigText}`,
          name: "Вход",
          attr: {
            type: "submit",
            class: `${styles.buttonBig}`,
          },
        }),
        inputLogin: new Input("div", {
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
            blur: () => this.inputBlur(),
          },
        }),
        inputPassword: new Input("div", {
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
            blur: () => this.inputBlur(),
          },
        }),
        buttonSmall: new Button("button", {
          classSpan: `${styles.buttonSmallText}`,
          name: "Авторизоваться",
          attr: {
            type: "submit",
            class: `${styles.buttonSmall}`,
          },
        }),
        events: {
          submit: (event: SubmitEvent) => this.loginForm(event),
        },
        attr: {
          class: `${styles.form}`,
        },
      })),
      (props.url = "/sign-up"),
      (props.title = "Нет аккаунта?"),
      (props.attr = {
        class: `${styles.loginWrapper}`,
      }),
      super("section", props);
  }

  setError(element: Record<string, any>, message: string) {
    const inputControl = element.parentElement.parentElement;
    const errorDisplay = inputControl.querySelector('[data-name="error"]');

    errorDisplay.innerText = message;
    element.classList.add(`${styles.errorBorder}`);
  }

  setSuccess(element: Record<string, any>) {
    const inputControl = element.parentElement.parentElement;
    const errorDisplay = inputControl.querySelector('[data-name="error"]');

    errorDisplay.innerText = "";
    element.classList.remove(`${styles.errorBorder}`);
  }

  validateInputs() {
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
      this.setError(login, "Login is required");
    } else if (!isValidLogin(loginValue)) {
      this.setError(
        login,
        "от 3 до 20 символов, латиница, может содержать цифры, \
    (допустимы дефис и нижнее подчёркивание)"
      );
    } else {
      this.setSuccess(login);
      data = Object.assign(data, { login: loginValue });
    }

    if (passwordValue === "") {
      this.setError(password, "Password is required");
    } else if (!isValidPassword(passwordValue)) {
      this.setError(
        password,
        "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра"
      );
    } else {
      this.setSuccess(password);
      data = Object.assign(data, { password: passwordValue });
    }

    return data;
  }

  inputBlur = () => {
    this.validateInputs();
  };

  loginForm(event: SubmitEvent) {
    event.preventDefault();
    const data = this.validateInputs();

    if (!data) {
      return;
    }

    const checkData: boolean = checkKeys(data, this._requiredKeys);
    if (!checkData) {
      console.log("need validate <-------");
    }
    this._authController.login(data as LoginFormModel);
  }

  render() {
    return this._compile(tpl, this._props);
  }
}
