import tpl from "./changeData.tmpl";
import Block from "../../services/Block";
import { ChangeDataProps } from "./types";
import store, { StoreEvents } from "../../services/Store";
import Avatar from "../../components/avatar/avatar";
import styles from "./changeData.module.scss";
import GoBack from "../../components/goBack/goBack";
import arrowLeftSVG from "../../../static/decor/arrowLeft.svg";
import unionSVG from "../../../static/decor/union.svg";
import ChangeBlockData from "./blockData/blockData";
import Input from "../../components/input/input";
import {
  isValidEmail,
  isValidLogin,
  isValidName,
  isValidPhone,
} from "../../utils/validation";
import Button from "../../components/button/button";
import checkKeys from "../../utils/checkKeys";
import UsersController from "../../controllers/users";
import { ChangeUserProfileFormModel } from "../../types/file";
import { urlResources } from "../../constants/constants";

export default class ChangeData extends Block<ChangeDataProps> {
  private _usersController = new UsersController();
  private _requiredKeys = [
    "email",
    "login",
    "first_name",
    "second_name",
    "display_name",
    "phone",
  ];

  constructor() {
    const props = new ChangeDataProps();
    const userData = store.getState()["userData"];
    console.log("userData-changeData <-------", userData);
    props.avatar = new Avatar("div", {
      unionSVG: `${unionSVG}`,
      width: "130",
      height: "130",
      attr: {
        class: `${styles.avatar}`,
      },
    });
    props.goBack = new GoBack("aside", {
      url: "/settings",
      arrowLeftSVG: `${arrowLeftSVG}`,
      attr: {
        class: `${styles.back}`,
      },
    });
    props.classData = `${styles.data}`;
    props.blockData = new ChangeBlockData("form", {
      classLine: `${styles.line}`,
      changeEmail: new Input("div", {
        classLabel: `${styles.changeLable}`,
        labelName: "Почта",
        classInput: `${styles.changeInput}`,
        type: "email",
        inputName: "email",
        value: `${userData?.email}`,
        classLine: `${styles.lineNone}`,
        classError: `${styles.error}`,
        attr: {
          class: `${styles.inputControl}`,
        },
        events: {
          blur: () => this.inputBlur(),
        },
      }),
      changeLogin: new Input("div", {
        classLabel: `${styles.changeLable}`,
        labelName: "Логин",
        classInput: `${styles.changeInput}`,
        type: "text",
        inputName: "login",
        value: `${userData?.login}`,
        classLine: `${styles.lineNone}`,
        classError: `${styles.error}`,
        attr: {
          class: `${styles.inputControl}`,
        },
        events: {
          blur: () => this.inputBlur(),
        },
      }),
      changeFirstName: new Input("div", {
        classLabel: `${styles.changeLable}`,
        labelName: "Имя",
        classInput: `${styles.changeInput}`,
        type: "text",
        inputName: "first_name",
        value: `${userData?.first_name}`,
        classLine: `${styles.lineNone}`,
        classError: `${styles.error}`,
        attr: {
          class: `${styles.inputControl}`,
        },
        events: {
          blur: () => this.inputBlur(),
        },
      }),
      changeSecondName: new Input("div", {
        classLabel: `${styles.changeLable}`,
        labelName: "Фамилия",
        classInput: `${styles.changeInput}`,
        type: "text",
        inputName: "second_name",
        value: `${userData?.second_name}`,
        classLine: `${styles.lineNone}`,
        classError: `${styles.error}`,
        attr: {
          class: `${styles.inputControl}`,
        },
        events: {
          blur: () => this.inputBlur(),
        },
      }),
      changeChatsName: new Input("div", {
        classLabel: `${styles.changeLable}`,
        labelName: "Имя в чате",
        classInput: `${styles.changeInput}`,
        type: "text",
        inputName: "display_name",
        value: `${userData?.display_name}`,
        classLine: `${styles.lineNone}`,
        classError: `${styles.error}`,
        attr: {
          class: `${styles.inputControl}`,
        },
        events: {
          blur: () => this.inputBlur(),
        },
      }),
      changePhone: new Input("div", {
        classLabel: `${styles.changeLable}`,
        labelName: "Телефон",
        classInput: `${styles.changeInput}`,
        type: "tel",
        inputName: "phone",
        value: `${userData?.phone}`,
        classLine: `${styles.lineNone}`,
        classError: `${styles.error}`,
        attr: {
          class: `${styles.inputControl}`,
        },
        events: {
          blur: () => this.inputBlur(),
        },
      }),
      buttonSubmit: new Button("button", {
        name: "Сохранить",
        attr: {
          type: "submit",
          class: `${styles.submit}`,
        },
      }),
      events: {
        submit: (event: SubmitEvent) => this.changeDataForm(event),
      },
      attr: {
        class: `${styles.blockData}`,
      },
    });
    (props.attr = {
      class: `${styles.changeDataWrapper}`,
    }),
      super("div", props);
    store.on(StoreEvents.Updated, () => this.updateUserData());
  }

  updateUserData() {
    let userData = store.getState()["userData"];

    if (userData) {
      this._children.avatar.setProps({
        unionSVG: `${urlResources}/${userData.avatar}`,
      });
      this._children.blockData._children.changeEmail.setProps({
        value: userData.email,
      });
      this._children.blockData._children.changeLogin.setProps({
        value: userData.login,
      });
      this._children.blockData._children.changeFirstName.setProps({
        value: userData.first_name,
      });
      this._children.blockData._children.changeSecondName.setProps({
        value: userData.second_name,
      });
      this._children.blockData._children.changeChatsName.setProps({
        value: userData.display_name,
      });
      this._children.blockData._children.changePhone.setProps({
        value: userData.phone,
      });
    }
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
    const displayName: HTMLInputElement | null = document.querySelector(
      '[name="display_name"]'
    );
    const phone: HTMLInputElement | null =
      document.querySelector('[name="phone"]');

    if (
      !email ||
      !login ||
      !firstName ||
      !secondName ||
      !displayName ||
      !phone
    ) {
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

    if (displayNameValue === "") {
      this.setError(displayName, "It's required");
    } else if (!isValidName(displayNameValue)) {
      this.setError(
        displayName,
        "Латиница или кириллица, первая буква должна быть заглавной,\
    без пробелов и без цифр, нет спецсимволов (допустим только дефис)"
      );
    } else {
      this.setSuccess(displayName);
      data = Object.assign(data, { display_name: displayNameValue });
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

  changeDataForm(event: SubmitEvent) {
    event.preventDefault();
    const data = this.validateInputs();

    if (!data) {
      return;
    }

    const checkData: boolean = checkKeys(data, this._requiredKeys);
    if (!checkData) {
      console.log("need validate <-------");
      return;
    }

    this._usersController.changeUserProfile(data as ChangeUserProfileFormModel);
  }
  render() {
    return this._compile(tpl, this._props);
  }
}
