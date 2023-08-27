import tpl from "./userChat.tmpl";
import Block from "../../../../services/Block";
import { UserChatProps } from "./types";
import styles from "./userChat.module.scss";
import store, { StoreEvents } from "../../../../services/Store";
import UserData from "./userData/userData";
import Avatar from "../../../../components/avatar/avatar";
import fotoSVG from "../../../../../static/decor/foto.svg";
import addSVG from "../../../../../static/decor/add.svg";
import deleteSVG from "../../../../../static/decor/delete.svg";
import fileSVG from "../../../../../static/decor/file.svg";
import locationSVG from "../../../../../static/decor/location.svg";
import readSVG from "../../../../../static/decor/read.svg";
import deliveredSVG from "../../../../../static/decor/delivered.svg";
import actionsSVG from "../../../../../static/decor/actions.svg";
import uploadSVG from "../../../../../static/decor/upload.svg";
import arrowRightSVG from "../../../../../static/decor/arrowRight.svg";
import ImgButton from "../../components/imgButton/imgButton";
import ChatsController from "../../../../controllers/chats";
import WindowActions from "../../components/windowActions/windowActions";
import CreateMessage from "./createMessage/createMessage";
import CommunicationWebSocket from "../../../../services/WebSocket";
import ListMessages from "./listMessages/listMessages";
import formatTime from "../../../../utils/formatTime";
import formatDate from "../../../../utils/formatDate";
import Button from "../../../../components/button/button";
import { urlResources } from "../../../../constants/constants";
import ModalWindow from "../../components/modalWindow/modalWindow";

export default class UserChat extends Block<UserChatProps> {
  private _chatsController = new ChatsController();
  constructor() {
    const props = new UserChatProps();
    (props.isUnSelectChat = true),
      (props.isSelectChat = false),
      (props.stylesDivUnSelect = `${styles.unSelect}`),
      (props.stylesUnSelect = `${styles.unSelectChat}`),
      (props.stylesSpanUnSelect = `${styles.spanUnSelectChat}`),
      (props.attr = {
        class: `${styles.userChat}`,
      }),
      super("section", props);
    store.on(StoreEvents.Updated, () => this.update());
  }

  update() {
    const chat = store.getState()["selectedChat"];
    const list = store.getState()["listMessages"];

    if (!chat) {
      this.setProps({
        isUnSelectChat: true,
        isSelectChat: false,
        stylesDivUnSelect: `${styles.unSelect}`,
        stylesUnSelect: `${styles.unSelectChat}`,
        stylesSpanUnSelect: `${styles.spanUnSelectChat}`,
        attr: {
          class: `${styles.userChat}`,
        },
      });
    }

    if (chat && list) {
      const arrMessage: any[] = [];
      let currentDate: string = "";
      list.map((item: any) => {
        if (currentDate !== `${formatDate(item.time)}`) {
          currentDate = `${formatDate(item.time)}`;
          const date = {
            classDate: `${styles.dateListMessages}`,
            date: `${formatDate(item.time)}`,
          };
          arrMessage.push(date);
        }
        let message: {};
        const userId = store.getState()["userData"].id;
        const isAuthor = item.user_id === userId ? true : false;
        if (isAuthor && item.is_read) {
          message = {
            classUserMessage: `${styles.messageRight}`,
            classContent: `${styles.content}`,
            content: `${item.content}`,
            classImage: `${styles.image}`,
            delivered: `${readSVG}`,
            classTime: `${styles.timeRead}`,
            time: `${formatTime(item.time)}`,
          };
        } else if (isAuthor && !item.is_read) {
          message = {
            classUserMessage: `${styles.messageRight}`,
            classContent: `${styles.content}`,
            content: `${item.content}`,
            classImage: `${styles.image}`,
            delivered: `${deliveredSVG}`,
            classTime: `${styles.time}`,
            time: `${formatTime(item.time)}`,
          };
        } else {
          message = {
            classUserMessage: `${styles.message}`,
            classContent: `${styles.content}`,
            content: `${item.content}`,
            classTime: `${styles.time}`,
            time: `${formatTime(item.time)}`,
          };
        }
        arrMessage.push(message);
      });

      const avatar = chat.avatar
        ? `${urlResources}/${chat.avatar}`
        : `${fotoSVG}`;

      this.setProps({
        isUnSelectChat: false,
        isSelectChat: true,
        modalWindowChangeAvatar: new ModalWindow("div", {
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
        }),
        stylesLine: `${styles.line}`,
        userData: new UserData("div", {
          avatar: new Avatar("div", {
            unionSVG: `${avatar}`,
            width: "34",
            height: "34",
            attr: {
              class: `${styles.avatarUser}`,
            },
            events: {
              click: () => this.changeAvatar(),
            },
          }),
          stylesName: `${styles.name}`,
          userName: `${chat.title}`,
          imgButtonActions: new ImgButton("button", {
            buttonSVG: `${actionsSVG}`,
            attr: {
              class: `${styles.actions}`,
            },
            events: {
              click: () => this.toggleActions(),
            },
          }),
          attr: {
            class: `${styles.userData}`,
          },
        }),
        blockActions: new WindowActions("div", {
          items: [
            {
              classWrapperAction: `${styles.wrapperAction}`,
              action: "addUser",
              classWrapperImage: `${styles.wrapperImage}`,
              image: addSVG,
              className: `${styles.nameActions}`,
              name: "Добавить пользователя",
            },
            {
              classWrapperAction: `${styles.wrapperAction}`,
              action: "deleteUser",
              classWrapperImage: `${styles.wrapperImage}`,
              image: deleteSVG,
              className: `${styles.nameActions}`,
              name: "Удалить пользователя",
            },
          ],
          attr: {
            class: `${styles.wrapperActions} ${styles.userActions}`,
            "data-actions": "actionsUser",
          },
        }),
        listMessages: new ListMessages("div", {
          items: arrMessage,
          attr: {
            class: `${styles.listMessages}`,
          },
        }),
        buttonDeleteChat: new Button("button", {
          classSpan: `${styles.createChatText}`,
          name: "Удалить чат",
          attr: {
            class: `${styles.buttonCreateChat}`,
          },
          events: {
            click: () => this.deleteChat(),
          },
        }),
        blockUpload: new WindowActions("div", {
          items: [
            {
              classWrapperAction: `${styles.wrapperAction}`,
              classWrapperImage: `${styles.wrapperImage}`,
              image: fotoSVG,
              className: `${styles.nameActions}`,
              name: "Фото или Видео",
            },
            {
              classWrapperAction: `${styles.wrapperAction}`,
              classWrapperImage: `${styles.wrapperImage}`,
              image: fileSVG,
              className: `${styles.nameActions}`,
              name: "Файл",
            },
            {
              classWrapperAction: `${styles.wrapperAction}`,
              classWrapperImage: `${styles.wrapperImage}`,
              image: locationSVG,
              className: `${styles.nameActions}`,
              name: "Локация",
            },
          ],
          attr: {
            class: `${styles.wrapperActions} ${styles.uploadMessage}`,
            "data-actions": "uploadFiles",
          },
        }),
        createMessage: new CreateMessage("form", {
          imgButtonUpload: new ImgButton("button", {
            buttonSVG: `${uploadSVG}`,
            attr: {
              class: `${styles.upload}`,
              type: "button",
            },
            events: {
              click: () => this.toggleUpload(),
            },
          }),
          stylesEnter: `${styles.enter}`,
          imgButtonSubmit: new ImgButton("button", {
            buttonSVG: `${arrowRightSVG}`,
            attr: {
              class: `${styles.submit}`,
              type: "submit",
            },
          }),
          attr: {
            class: `${styles.createMessage}`,
          },
          events: {
            submit: (event: SubmitEvent) => this.messageForm(event),
          },
        }),
        attr: {
          class: `${styles.userChat}`,
        },
      });
    }
  }

  changeAvatar() {
    const selectedChat = store.getState()["selectedChat"];
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
      this._chatsController.changeChatAvatar(selectedChat.id, selectedFile);
      modalWindow?.classList.remove(`${styles.modalWindowV}`);
      modalWindow?.classList.add(`${styles.modalWindowH}`);
      store.on(StoreEvents.Updated, () => this.updateSelectedChat());
    });
  }

  updateSelectedChat() {
    let selectedChat = store.getState()["selectedChat"];
    if (selectedChat) {
      this._children.avatar.setProps({
        unionSVG: `${urlResources}/${selectedChat.avatar}`,
      });
    }
  }

  deleteChat() {
    const user = store.getState()["userData"];
    let chat = store.getState()["selectedChat"];
    if (user && chat && user.id !== chat.created_by) {
      alert("Вы не создатель чата");
    }
    if (user && chat && user.id === chat.created_by) {
      this._chatsController.deleteChat({ chatId: chat.id });
      store.set("selectedChat", null);
      store.on(StoreEvents.Updated, () => this.update());
    }
  }

  toggleActions() {
    const block = document.querySelector('[data-actions="actionsUser"]');
    block?.classList.toggle(`${styles.displayBlock}`);
    const buttonAdd = document.querySelector('[data-action="addUser"]');
    const buttonDelete = document.querySelector('[data-action="deleteUser"]');
    buttonAdd?.addEventListener("click", this.addUser);
    buttonDelete?.addEventListener("click", this.deleteUser);
  }

  addUser() {
    const block = document.querySelector('[data-actions="actionsUser"]');
    const modalWindow = document.querySelector('[data-name="modalWindowAdd"]');
    modalWindow?.classList.remove(`${styles.modalWindowH}`);
    modalWindow?.classList.add(`${styles.modalWindowV}`);
    block?.classList.toggle(`${styles.displayBlock}`);

    modalWindow?.addEventListener("click", (event) => {
      if (event.target === modalWindow) {
        modalWindow?.classList.remove(`${styles.modalWindowV}`);
        modalWindow?.classList.add(`${styles.modalWindowH}`);
      }
    });

    const form = document.querySelector('[data-name="addUser_modal"]');
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input: HTMLInputElement | null = document.querySelector(
        '[name="addNewUser"]'
      );
      if (!input) {
        return;
      }
      const inputValue = input.value.trim();
      const selectedChat = store.getState()["selectedChat"];
      const chatsController = new ChatsController();
      chatsController.addUsersToChat({
        login: inputValue,
        chatId: selectedChat.id,
      });

      modalWindow?.classList.remove(`${styles.modalWindowV}`);
      modalWindow?.classList.add(`${styles.modalWindowH}`);
    });
  }

  deleteUser() {
    const block = document.querySelector('[data-actions="actionsUser"]');
    const modalWindow = document.querySelector(
      '[data-name="modalWindowDelete"]'
    );
    modalWindow?.classList.remove(`${styles.modalWindowH}`);
    modalWindow?.classList.add(`${styles.modalWindowV}`);
    block?.classList.toggle(`${styles.displayBlock}`);

    modalWindow?.addEventListener("click", (event) => {
      if (event.target === modalWindow) {
        modalWindow?.classList.remove(`${styles.modalWindowV}`);
        modalWindow?.classList.add(`${styles.modalWindowH}`);
      }
    });

    const form = document.querySelector('[data-name="deleteUser_modal"]');
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input: HTMLInputElement | null = document.querySelector(
        '[name="deleteUser"]'
      );
      if (!input) {
        return;
      }
      const inputValue = input.value.trim();
      const selectedChat = store.getState()["selectedChat"];
      const chatsController = new ChatsController();
      chatsController.deleteUsersToChat({
        login: inputValue,
        chatId: selectedChat.id,
      });

      modalWindow?.classList.remove(`${styles.modalWindowV}`);
      modalWindow?.classList.add(`${styles.modalWindowH}`);
    });
  }

  toggleUpload() {
    const block = document.querySelector('[data-actions="uploadFiles"]');
    block?.classList.toggle(`${styles.displayBlock}`);
  }

  messageForm(event: SubmitEvent) {
    event.preventDefault();
    const input: HTMLInputElement | null =
      document.querySelector('[name="message"]');
    if (!input) {
      return;
    }
    let inputValue = input.value.trim();

    if (inputValue === "") {
      console.log("empty message <-------");
      return;
    }
    const socket = store.getState()["currentSocket"] as CommunicationWebSocket;

    if (socket) {
      socket.sendMessage(inputValue);
      inputValue = "";
    }
  }

  render() {
    return this._compile(tpl, this._props);
  }
}
