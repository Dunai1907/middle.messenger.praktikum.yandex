import Avatar from "../../components/avatar/avatar";
import arrowLeftSVG from "../../../static/decor/arrowLeft.svg";
import unionSVG from "../../../static/decor/union.svg";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import checkKeys from "../../utils/checkKeys";
import { isValidPassword } from "../../utils/validation";
import GoBack from "../../components/goBack/goBack";
import ChangePassword from "./changePassword";
import styles from "./changePassword.module.scss";
import ChangeBlockPassword from "./blockPassword/blockPassword";

const requiredKeys = ["oldPassword", "newPassword", "repeatNewPassword"];

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
    setError(oldPassword, "OldPassword is required");
  } else if (!isValidPassword(oldPasswordValue)) {
    setError(oldPassword, "Validation error");
  } else {
    setSuccess(oldPassword);
    data = Object.assign(data, { oldPassword: oldPasswordValue });
  }

  if (newPasswordValue === "") {
    setError(newPassword, "NewPassword is required");
  } else if (!isValidPassword(newPasswordValue)) {
    setError(newPassword, "Validation error");
  } else {
    setSuccess(newPassword);
    data = Object.assign(data, { newPassword: newPasswordValue });
  }

  if (repeatNewPasswordValue === "") {
    setError(repeatNewPassword, "Repeat newPassword is required");
  } else if (repeatNewPasswordValue !== newPasswordValue) {
    setError(repeatNewPassword, "Пароли не совпадают");
  } else {
    setSuccess(repeatNewPassword);
    data = Object.assign(data, { repeatNewPassword: repeatNewPasswordValue });
  }

  return data;
};

const inputBlur = () => {
  validateInputs();
};

const changePasswordForm = (event: SubmitEvent) => {
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

const goBack = new GoBack("aside", {
  url: "/",
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

const oldPassword = new Input("div", {
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
    blur: inputBlur,
  },
});

const newPassword = new Input("div", {
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
    blur: inputBlur,
  },
});

const repeatNewPassword = new Input("div", {
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

const blockPassword = new ChangeBlockPassword("form", {
  classLine: `${styles.line}`,
  oldPassword,
  newPassword,
  repeatNewPassword,
  buttonSubmit,
  events: {
    submit: changePasswordForm,
  },
  attr: {
    class: `${styles.blockData}`,
  },
});

const changePasswordPage = new ChangePassword("div", {
  goBack,
  classData: `${styles.data}`,
  avatar,
  blockPassword,
  attr: {
    class: `${styles.changePasswordWrapper}`,
  },
});

export default changePasswordPage;
