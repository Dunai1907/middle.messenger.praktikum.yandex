import tpl from "./registration.tmpl";
import Block from "../../services/Block";
import { RegistrationProps } from "./types";
import AuthController from "../../controllers/auth";
import styles from "./registration.module.scss";
import Form from "../../components/form/form";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import {
  isValidEmail,
  isValidLogin,
  isValidName,
  isValidPassword,
  isValidPhone,
} from "../../utils/validation";
import checkKeys from "../../utils/checkKeys";
import { RegistrationFormModel } from "../../types/file";

export default class Registration extends Block<RegistrationProps> {
  private _requiredKeys = [
    "email",
    "login",
    "firstName",
    "secondName",
    "phone",
    "password",
  ];
  private _authController = new AuthController();

  constructor() {
    const props = new RegistrationProps();
    (props.className = `${styles.formBlock}`),
      (props.form = new Form("form", {
        buttonBig: new Button("button", {
          classSpan: `${styles.buttonBigText}`,
          name: "Регистрация",
          attr: {
            type: "submit",
            class: `${styles.buttonBig}`,
          },
        }),
        inputEmail: new Input("div", {
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
            blur: () => this.inputBlur(),
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
        inputFirstName: new Input("div", {
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
            blur: () => this.inputBlur(),
          },
        }),
        inputSecondName: new Input("div", {
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
            blur: () => this.inputBlur(),
          },
        }),
        inputPhone: new Input("div", {
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
        inputRepeatPassword: new Input("div", {
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
            blur: () => this.inputBlur(),
          },
        }),
        buttonSmall: new Button("button", {
          classSpan: `${styles.buttonSmallText}`,
          name: "Зарегистрироваться",
          attr: {
            type: "submit",
            class: `${styles.buttonSmall}`,
          },
        }),
        events: {
          submit: (event: SubmitEvent) => this.registrationForm(event),
        },
        attr: {
          class: `${styles.form}`,
        },
      })),
      (props.url = "/"),
      (props.title = "Войти"),
      (props.attr = {
        class: `${styles.regisrationWrapper}`,
      }),
      super("section", props);
  }

  async registrationForm(event: SubmitEvent) {
    event.preventDefault();
    const data = this.validateInputs();

    if (!data) {
      return;
    }

    const checkData: boolean = checkKeys(data, this._requiredKeys);
    if (!checkData) {
      console.log("need validate <-------");
    }
    this._authController.registration(data as RegistrationFormModel);
  }

  inputBlur() {
    this.validateInputs();
  }

  validateInputs() {
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

    let data: Record<string, string> = {};

    if (emailValue === "") {
      this.setError(email, "Email is required");
    } else if (!isValidEmail(emailValue)) {
      this.setError(
        email,
        "латиница, может включать цифры и спецсимволы,\
       обязательно должна быть @ и точка после неё."
      );
    } else {
      this.setSuccess(email);
      data = Object.assign(data, { email: emailValue });
    }

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

    if (firstNameValue === "") {
      this.setError(firstName, "It's required");
    } else if (!isValidName(firstNameValue)) {
      this.setError(
        firstName,
        "Латиница или кириллица, первая буква должна быть заглавной,\
      без пробелов и без цифр, нет спецсимволов (допустим только дефис)"
      );
    } else {
      this.setSuccess(firstName);
      data = Object.assign(data, { first_name: firstNameValue });
    }

    if (secondNameValue === "") {
      this.setError(secondName, "It's required");
    } else if (!isValidName(secondNameValue)) {
      this.setError(
        secondName,
        "Латиница или кириллица, первая буква должна быть заглавной,\
      без пробелов и без цифр, нет спецсимволов (допустим только дефис)"
      );
    } else {
      this.setSuccess(secondName);
      data = Object.assign(data, { second_name: secondNameValue });
    }

    if (phoneValue === "") {
      this.setError(phone, "Phone required");
    } else if (!isValidPhone(phoneValue)) {
      this.setError(
        phone,
        "от 10 до 15 символов, состоит из цифр, может начинается с плюса."
      );
    } else {
      this.setSuccess(phone);
      data = Object.assign(data, { phone: phoneValue });
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

    if (passwordRepeatValue === "") {
      this.setError(repeatPassword, "Password is required");
    } else if (passwordRepeatValue !== passwordValue) {
      this.setError(repeatPassword, "Пароли не совпадают");
    } else {
      this.setSuccess(repeatPassword);
    }

    return data;
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

  render() {
    return this._compile(tpl, this._props);
  }
}
