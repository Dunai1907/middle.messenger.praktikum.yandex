import Profile from "./profile";
import Avatar from "../../components/avatar/avatar";
import arrowLeftSVG from "../../../static/decor/arrowLeft.svg";
import unionSVG from "../../../static/decor/union.svg";
import styles from "./profile.module.scss";
import BlockAction from "./modules/blockAction/blockAction";
import DataProfile from "./components/data/data";
import BlockData from "./modules/blockData/blockData";
import GoBack from "../../components/goBack/goBack";
import store from "../../services/Store";
import Button from "../../components/button/button";
import AuthController from "../../controllers/auth";
import ModalWindow from "../chats/components/modalWindow/modalWindow";
import UsersController from "../../controllers/users";

const authController = new AuthController();
const usersController = new UsersController();

const state = store.getState();
console.log("state <-------", state);

const name = "Иван";

const data = {
  email: "pochta@yandex.ru",
  login: "ivanivanov",
  firstName: "Иван",
  secondName: "Иванов",
  chatsName: "Иван",
  phone: "+7 (909) 967 30 30",
};

const logout = () => {
  authController.logout();
};

const changeAvatar = () => {
  const modalWindow = document.querySelector(
    '[data-name="modalWindowChangeAvatar"]'
  );
  modalWindow?.classList.remove(`${styles.modalWindowH}`);
  modalWindow?.classList.add(`${styles.modalWindowV}`);

  modalWindow?.addEventListener("click", (event) => {
    if (event.target === modalWindow) {
      modalWindow?.classList.remove(`${styles.modalWindowV}`);
      modalWindow?.classList.add(`${styles.modalWindowH}`);
    }
  });

  const form = document.querySelector('[data-name="changeAvatar_modal"]');
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input: HTMLInputElement | null = document.querySelector(
      '[name="upload_avatar"]'
    );
    if (!input?.files) {
      return;
    }
    const selectedFile = input.files[0];
    usersController.changeUserAvatar(selectedFile);
  });
};

const goBack = new GoBack("aside", {
  url: "/messenger",
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
  events: {
    click: changeAvatar,
  },
});

const dataEmail = new DataProfile("div", {
  className: `${styles.spanName}`,
  name: "Почта",
  classValue: `${styles.spanValue}`,
  value: `${state.user?.email}`,
  attr: {
    class: `${styles.dataWrapper}`,
  },
});

const dataLogin = new DataProfile("div", {
  className: `${styles.spanName}`,
  name: "Логин",
  classValue: `${styles.spanValue}`,
  value: `${data.login}`,
  attr: {
    class: `${styles.dataWrapper}`,
  },
});

const dataFirstName = new DataProfile("div", {
  className: `${styles.spanName}`,
  name: "Имя",
  classValue: `${styles.spanValue}`,
  value: `${data.firstName}`,
  attr: {
    class: `${styles.dataWrapper}`,
  },
});

const dataSecondName = new DataProfile("div", {
  className: `${styles.spanName}`,
  name: "Фамилия",
  classValue: `${styles.spanValue}`,
  value: `${data.secondName}`,
  attr: {
    class: `${styles.dataWrapper}`,
  },
});

const dataChatsName = new DataProfile("div", {
  className: `${styles.spanName}`,
  name: "Имя в чате",
  classValue: `${styles.spanValue}`,
  value: `${data.chatsName}`,
  attr: {
    class: `${styles.dataWrapper}`,
  },
});

const dataPhone = new DataProfile("div", {
  className: `${styles.spanName}`,
  name: "Телефон",
  classValue: `${styles.spanValue}`,
  value: `${data.phone}`,
  attr: {
    class: `${styles.dataWrapper}`,
  },
});

const blockData = new BlockData("div", {
  classLine: `${styles.line}`,
  dataEmail,
  dataLogin,
  dataFirstName,
  dataSecondName,
  dataChatsName,
  dataPhone,
  attr: {
    class: `${styles.blockData}`,
  },
});

const buttonLogout = new Button("button", {
  name: "Выход",
  attr: {
    class: `${styles.action} ${styles.red}`,
  },
  events: {
    click: logout,
  },
});

const blockAction = new BlockAction("div", {
  classAction: `${styles.action}`,
  classMediumBlue: `${styles.mediumBlue}`,
  changeDataPath: "/change-data",
  changeData: "Изменить данные",
  classLine: `${styles.line}`,
  changePasswordPath: "/change-password",
  changePassword: "Изменить пароль",
  buttonLogout,
  attr: {
    class: `${styles.blockAction}`,
  },
});

const buttonChange = new Button("button", {
  classSpan: `${styles.buttonText}`,
  name: "Поменять",
  attr: {
    class: `${styles.buttonModalWindow}`,
    type: "submit",
  },
});

const modalWindowChangeAvatar = new ModalWindow("div", {
  classContent: `${styles.modalContent}`,
  classSpan: `${styles.spanModalWindow}`,
  name: "Загрузите файл",
  dataName: "changeAvatar_modal",
  inputType: "file",
  inputName: "upload_avatar",
  classInput: `${styles.inputModalWindow}`,
  buttonAction: buttonChange,
  attr: {
    class: `${styles.modalWindowH}`,
    "data-name": "modalWindowChangeAvatar",
  },
});

const profilePage = new Profile("div", {
  modalWindowChangeAvatar,
  goBack,
  classData: `${styles.data}`,
  avatar,
  className: `${styles.name}`,
  name: `${name}`,
  blockData,
  blockAction,
  attr: {
    class: `${styles.profileWrapper}`,
  },
});

export default profilePage;
