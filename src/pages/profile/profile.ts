import tpl from "./profile.tmpl";
import Block from "../../services/Block";
import GoBack from "../../components/goBack/goBack";
import Avatar from "../../components/avatar/avatar";
import BlockData from "./modules/blockData/blockData";
import BlockAction from "./modules/blockAction/blockAction";
import ModalWindow from "../chats/components/modalWindow/modalWindow";
import styles from "./profile.module.scss";
import Button from "../../components/button/button";
import arrowLeftSVG from "../../../static/decor/arrowLeft.svg";
import unionSVG from "../../../static/decor/union.svg";
import UsersController from "../../controllers/users";
import DataProfile from "./components/data/data";
import AuthController from "../../controllers/auth";
import { ProfileProps } from "./types";
import store, { StoreEvents } from "../../services/Store";

export default class Profile extends Block<ProfileProps> {
  private _usersController = new UsersController();
  private _authController = new AuthController();

  constructor() {
    const props = new ProfileProps();
    const userData = store.getState()["userData"];
    if (userData) {
      userData.avatar = `${userData.avatar}`;
    }
    props.userData = userData
      ? userData
      : {
          first_name: "",
          second_name: "",
          login: "",
          id: 0,
          avatar: `${unionSVG}`,
          display_name: "",
          email: "",
          phone: "",
        };

    (props.modalWindowChangeAvatar = new ModalWindow("div", {
      classContent: `${styles.modalContent}`,
      classSpan: `${styles.spanModalWindow}`,
      name: "Загрузите файл",
      dataName: "changeAvatar_modal",
      inputType: "file",
      inputName: "upload_avatar",
      classInput: `${styles.inputModalWindow}`,
      buttonAction: new Button("button", {
        classSpan: `${styles.buttonText}`,
        name: "Поменять",
        attr: {
          class: `${styles.buttonModalWindow}`,
          type: "submit",
        },
      }),
      attr: {
        class: `${styles.modalWindowH}`,
        "data-name": "modalWindowChangeAvatar",
      },
    })),
      (props.goBack = new GoBack("aside", {
        url: "/messenger",
        arrowLeftSVG: `${arrowLeftSVG}`,
        attr: {
          class: `${styles.back}`,
        },
      })),
      (props.classData = `${styles.data}`),
      (props.avatar = new Avatar("div", {
        unionSVG: `${props.userData?.avatar}`,
        width: "130",
        height: "130",
        attr: {
          class: `${styles.avatar}`,
        },
        events: {
          click: () => this.changeAvatar(),
        },
      })),
      (props.className = `${styles.name}`),
      (props.name = `${props.userData?.first_name}`),
      (props.blockData = new BlockData("div", {
        classLine: `${styles.line}`,
        dataEmail: new DataProfile("div", {
          className: `${styles.spanName}`,
          name: "Почта",
          classValue: `${styles.spanValue}`,
          value: `${props.userData?.email}`,
          attr: {
            class: `${styles.dataWrapper}`,
          },
        }),
        dataLogin: new DataProfile("div", {
          className: `${styles.spanName}`,
          name: "Логин",
          classValue: `${styles.spanValue}`,
          value: `${props.userData?.login}`,
          attr: {
            class: `${styles.dataWrapper}`,
          },
        }),
        dataFirstName: new DataProfile("div", {
          className: `${styles.spanName}`,
          name: "Имя",
          classValue: `${styles.spanValue}`,
          value: `${props.userData?.first_name}`,
          attr: {
            class: `${styles.dataWrapper}`,
          },
        }),
        dataSecondName: new DataProfile("div", {
          className: `${styles.spanName}`,
          name: "Фамилия",
          classValue: `${styles.spanValue}`,
          value: `${props.userData?.second_name}`,
          attr: {
            class: `${styles.dataWrapper}`,
          },
        }),
        dataChatsName: new DataProfile("div", {
          className: `${styles.spanName}`,
          name: "Имя в чате",
          classValue: `${styles.spanValue}`,
          value: `${props.userData?.display_name}`,
          attr: {
            class: `${styles.dataWrapper}`,
          },
        }),
        dataPhone: new DataProfile("div", {
          className: `${styles.spanName}`,
          name: "Телефон",
          classValue: `${styles.spanValue}`,
          value: `${props.userData?.phone}`,
          attr: {
            class: `${styles.dataWrapper}`,
          },
        }),
        attr: {
          class: `${styles.blockData}`,
        },
      })),
      (props.blockAction = new BlockAction("div", {
        classAction: `${styles.action}`,
        classMediumBlue: `${styles.mediumBlue}`,
        changeDataPath: "/change-data",
        changeData: "Изменить данные",
        classLine: `${styles.line}`,
        changePasswordPath: "/change-password",
        changePassword: "Изменить пароль",
        buttonLogout: new Button("button", {
          name: "Выход",
          attr: {
            class: `${styles.action} ${styles.red}`,
          },
          events: {
            click: () => this.logout(),
          },
        }),
        attr: {
          class: `${styles.blockAction}`,
        },
      })),
      (props.attr = {
        class: `${styles.profileWrapper}`,
      }),
      super("div", props);
    this._authController.getUser();
    store.on(StoreEvents.Updated, () => this.updateUserData());
  }

  render() {
    return this._compile(tpl, this._props);
  }

  updateUserData() {
    let userData = store.getState()["userData"];
    if (userData) {
      userData.avatar = `${userData.avatar}`;
    }
    this.setProps({ name: userData.login });
    this._children.blockData._children.dataEmail.setProps({
      value: userData.email,
    });
    this._children.blockData._children.dataLogin.setProps({
      value: userData.login,
    });
    this._children.blockData._children.dataFirstName.setProps({
      value: userData.first_name,
    });
    this._children.blockData._children.dataSecondName.setProps({
      value: userData.second_name,
    });
    this._children.blockData._children.dataChatsName.setProps({
      value: userData.display_name,
    });
    this._children.blockData._children.dataPhone.setProps({
      value: userData.phone,
    });
    this._children.avatar.setProps({
      unionSVG: `${userData.avatar}`,
    });
  }

  changeAvatar() {
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
      this._usersController.changeUserAvatar(selectedFile);
      modalWindow?.classList.remove(`${styles.modalWindowV}`);
      modalWindow?.classList.add(`${styles.modalWindowH}`);
      store.on(StoreEvents.Updated, () => this.updateUserData());
    });
  }

  logout() {
    this._authController.logout();
    store.removeState();
  }
}
