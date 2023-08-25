import tpl from "./changePassword.tmpl";
import Block from "../../services/Block";
import GoBack from "../../components/goBack/goBack";
import Avatar from "../../components/avatar/avatar";
import UsersController from "../../controllers/users";
import { ChangePasswordProps } from "./types";
import store from "../../services/Store";
import styles from "./changePassword.module.scss";
import arrowLeftSVG from "../../../static/decor/arrowLeft.svg";
import unionSVG from "../../../static/decor/union.svg";
import Input from "../../components/input/input";
import ChangeBlockPassword from "./blockPassword/blockPassword";
import Button from "../../components/button/button";
import { isValidPassword } from "../../utils/validation";
import checkKeys from "../../utils/checkKeys";
import { ChangeUserPasswordFormModel } from "../../types/file";

export default class ChangePassword extends Block<ChangePasswordProps> {
  private _usersController = new UsersController();
  private _requiredKeys = ["oldPassword", "newPassword"];
  constructor() {
    const props = new ChangePasswordProps();
    const userData = store.getState()["userData"];
    const svg = userData?.avatar ? `${userData.avatar}` : `${unionSVG}`;
    props.avatar = new Avatar("div", {
      unionSVG: svg,
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
    props.blockPassword = new ChangeBlockPassword("form", {
      classLine: `${styles.line}`,
      oldPassword: new Input("div", {
        classLabel: `${styles.changeLable}`,
        labelName: "Старый пароль",
        classInput: `${styles.changeInput}`,
        type: "password",
        inputName: "current-password",
        classLine: `${styles.lineNone}`,
        classError: `${styles.error}`,
        attr: {
          class: `${styles.inputControl}`,
        },
        events: {
          blur: () => this.inputBlur(),
        },
      }),
      newPassword: new Input("div", {
        classLabel: `${styles.changeLable}`,
        labelName: "Новый пароль",
        classInput: `${styles.changeInput}`,
        type: "password",
        inputName: "new-password",
        classLine: `${styles.lineNone}`,
        classError: `${styles.error}`,
        attr: {
          class: `${styles.inputControl}`,
        },
        events: {
          blur: () => this.inputBlur(),
        },
      }),
      repeatNewPassword: new Input("div", {
        classLabel: `${styles.changeLable}`,
        labelName: "Повторите новый пароль",
        classInput: `${styles.changeInput}`,
        type: "password",
        inputName: "repeat-new-password",
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
        submit: (event: SubmitEvent) => this.changePasswordForm(event),
      },
      attr: {
        class: `${styles.blockData}`,
      },
    });
    (props.attr = {
      class: `${styles.changePasswordWrapper}`,
    }),
      super("div", props);
  }

  inputBlur() {
    this.validateInputs();
  }
  validateInputs() {
    const oldPassword: HTMLInputElement | null = document.querySelector(
      '[name="current-password"]'
    );
    const newPassword: HTMLInputElement | null = document.querySelector(
      '[name="new-password"]'
    );
    const repeatNewPassword: HTMLInputElement | null = document.querySelector(
      '[name="repeat-new-password"]'
    );

    if (!oldPassword || !newPassword || !repeatNewPassword) {
      return;
    }

    const oldPasswordValue = oldPassword.value.trim();
    const newPasswordValue = newPassword.value.trim();
    const repeatNewPasswordValue = repeatNewPassword.value.trim();

    let data: Record<string, string> = {};

    if (oldPasswordValue === "") {
      this.setError(oldPassword, "OldPassword is required");
    } else if (!isValidPassword(oldPasswordValue)) {
      this.setError(
        oldPassword,
        "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра"
      );
    } else {
      this.setSuccess(oldPassword);
      data = Object.assign(data, { oldPassword: oldPasswordValue });
    }

    if (newPasswordValue === "") {
      this.setError(newPassword, "NewPassword is required");
    } else if (!isValidPassword(newPasswordValue)) {
      this.setError(
        newPassword,
        "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра"
      );
    } else {
      this.setSuccess(newPassword);
      data = Object.assign(data, { newPassword: newPasswordValue });
    }

    if (repeatNewPasswordValue === "") {
      this.setError(repeatNewPassword, "Repeat newPassword is required");
    } else if (repeatNewPasswordValue !== newPasswordValue) {
      this.setError(repeatNewPassword, "Пароли не совпадают");
    } else {
      this.setSuccess(repeatNewPassword);
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

  changePasswordForm(event: SubmitEvent) {
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

    this._usersController.changeUserPassword(
      data as ChangeUserPasswordFormModel
    );
  }
  render() {
    return this._compile(tpl, this._props);
  }
}
