import tpl from "./chats.tmpl";
import Block from "../../services/Block";
import ModalWindow from "./components/modalWindow/modalWindow";
import ListChats from "./modules/listChats/listChats";
import UserChat from "./modules/userChat/userChat";
import { messages } from "../../constants/constants";
import styles from "./chats.module.scss";
import profileSVG from "../../../static/decor/profile.svg";
import searchSVG from "../../../static/decor/search.svg";
import actionsSVG from "../../../static/decor/actions.svg";
import uploadSVG from "../../../static/decor/upload.svg";
import arrowRightSVG from "../../../static/decor/arrowRight.svg";
import readSVG from "../../../static/decor/read.svg";
import deliveredSVG from "../../../static/decor/delivered.svg";
import sentSVG from "../../../static/decor/sent.svg";
import addSVG from "../../../static/decor/add.svg";
import deleteSVG from "../../../static/decor/delete.svg";
import fotoSVG from "../../../static/decor/foto.svg";
import fileSVG from "../../../static/decor/file.svg";
import locationSVG from "../../../static/decor/location.svg";
import UserData from "./modules/userChat/userData/userData";
import Avatar from "../../components/avatar/avatar";
import ImgButton from "./components/imgButton/imgButton";
import CreateMessage from "./modules/userChat/createMessage/createMessage";
import ListMessages from "./modules/userChat/listMessages/listMessages";
import WindowActions from "./components/windowActions/windowActions";
import Button from "../../components/button/button";
import ChatsController from "../../controllers/chats";
import { ChatsPageProps } from "./types";
import store, { StoreEvents } from "../../services/Store";
import createDate from "../../utils/createDate";
import Chat from "./components/chat/chat";

export default class ChatsPage extends Block<ChatsPageProps> {
  private _chatsController = new ChatsController();

  constructor() {
    const user = {
      avatar: "https://img.icons8.com/?size=512&id=Rke83hCOnYV0&format=png",
      name: "Ivan11",
    };
    const arrMessage: any[] = [];
    let currentDate: string = "";

    messages.forEach((item) => {
      if (currentDate !== item.date) {
        currentDate = item.date;
        const date = {
          classDate: `${styles.dateListMessages}`,
          date: `${item.date}`,
        };
        arrMessage.push(date);
      }

      let message: {};

      if (item.isAuthor && item.isRead) {
        message = {
          classUserMessage: `${styles.messageRight}`,
          classContent: `${styles.content}`,
          content: `${item.content}`,
          classImage: `${styles.image}`,
          delivered: `${readSVG}`,
          classTime: `${styles.timeRead}`,
          time: `${item.time}`,
        };
      } else if (item.isAuthor && item.isDelivered && !item.isRead) {
        message = {
          classUserMessage: `${styles.messageRight}`,
          classContent: `${styles.content}`,
          content: `${item.content}`,
          classImage: `${styles.image}`,
          delivered: `${deliveredSVG}`,
          classTime: `${styles.time}`,
          time: `${item.time}`,
        };
      } else if (item.isAuthor && !item.isDelivered && !item.isRead) {
        message = {
          classUserMessage: `${styles.messageRight}`,
          classContent: `${styles.content}`,
          content: `${item.content}`,
          classImage: `${styles.image}`,
          delivered: `${sentSVG}`,
          classTime: `${styles.time}`,
          time: `${item.time}`,
        };
      } else {
        message = {
          classUserMessage: `${styles.message}`,
          classContent: `${styles.content}`,
          content: `${item.content}`,
          classTime: `${styles.time}`,
          time: `${item.time}`,
        };
      }
      arrMessage.push(message);
    });
    const props = new ChatsPageProps();

    const chatsList: any[] = store.getState()["chatsList"];

    const arrChat: any[] = [];
    chatsList.forEach((item) => {
      const avatar = item.avatar
        ? `${item.avatar}`
        : "https://img.icons8.com/?size=512&id=Rke83hCOnYV0&format=png";

      const date = item.created_by ? createDate(item.created_by) : "нет даты";
      const chat = new Chat("div", {
        chatId: `${item.id}`,
        stylesChat: `${styles.chat}`,
        stylesAvatar: `${styles.avatar}`,
        avatar: `${avatar}`,
        stylesMain: `${styles.main}`,
        stylesWrap: `${styles.wrap}`,
        stylesName: `${styles.name}`,
        stylesSpanName: `${styles.spanName}`,
        name: `${item.title}`,
        stylesDate: `${styles.date}`,
        stylesSpanDate: `${styles.spanDate}`,
        date: `${date}`,
        stylesText: `${styles.text}`,
        stylesSpanText: `${styles.spanText}`,
        text: `${item.last_message}`,
        stylesNumber: `${styles.number}`,
        stylesSpanNumber: `${styles.spanNumber}`,
        number: `${item.unread_count}`,
        dataName: "selectChat",
        attr: {
          class: `${styles.chat}`,
          dataName: "selectChat",
          'data-id': `${item.id}`,
        },
      });
      arrChat.push(chat);
    });

    props.modalWindowAdd = new ModalWindow("div", {
      classContent: `${styles.modalContent}`,
      classSpan: `${styles.spanModalWindow}`,
      name: "Добавить пользователя",
      dataName: "addUser_modal",
      classLabel: `${styles.labelModalWindow}`,
      labelName: "login",
      inputType: "text",
      inputName: "addNewUser",
      classInput: `${styles.inputModalWindow}`,
      classLine: `${styles.line}`,
      buttonAction: new Button("button", {
        classSpan: `${styles.buttonText}`,
        name: "Добавить",
        attr: {
          class: `${styles.buttonModalWindow}`,
          type: "submit",
        },
      }),
      attr: {
        class: `${styles.modalWindowH}`,
        "data-name": "modalWindowAdd",
      },
    });
    (props.modalWindowDelete = new ModalWindow("div", {
      classContent: `${styles.modalContent}`,
      classSpan: `${styles.spanModalWindow}`,
      name: "Удалить пользователя",
      dataName: "deleteUser_modal",
      classLabel: `${styles.labelModalWindow}`,
      labelName: "login",
      inputType: "text",
      inputName: "deleteUser",
      classInput: `${styles.inputModalWindow}`,
      classLine: `${styles.line}`,
      buttonAction: new Button("button", {
        classSpan: `${styles.buttonText}`,
        name: "Удалить",
        attr: {
          class: `${styles.buttonModalWindow}`,
          type: "submit",
        },
      }),
      attr: {
        class: `${styles.modalWindowH}`,
        "data-name": "modalWindowDelete",
      },
    })),
      (props.listChats = new ListChats("aside", {
        modalWindowCreateChat: new ModalWindow("div", {
          classContent: `${styles.modalContent}`,
          classSpan: `${styles.spanModalWindow}`,
          name: "Создать чат",
          dataName: "createChat_modal",
          classLabel: `${styles.labelModalWindow}`,
          labelName: "Название чата",
          inputType: "text",
          inputName: "createChat",
          classInput: `${styles.inputModalWindow}`,
          classLine: `${styles.line}`,
          buttonAction: new Button("button", {
            classSpan: `${styles.buttonText}`,
            name: "Создать",
            attr: {
              class: `${styles.buttonModalWindow}`,
              type: "submit",
            },
          }),
          attr: {
            class: `${styles.modalWindowH}`,
            "data-name": "modalWindowCreateChat",
          },
        }),
        hrefValue: "/settings",
        stylesButtonProfile: `${styles.buttonProfile}`,
        stylesForm: `${styles.form}`,
        searchSVG: `${searchSVG}`,
        stylesSearch: `${styles.search}`,
        items: arrChat,
        profileSVG: `${profileSVG}`,
        buttonCreateChat: new Button("button", {
          classSpan: `${styles.createChatText}`,
          name: "Создать чат",
          attr: {
            class: `${styles.buttonCreateChat}`,
          },
          events: {
            click: () => this.addChat(),
          },
        }),
        attr: {
          class: `${styles.listChats}`,
        },
      })),
      (props.userChat = new UserChat("section", {
        stylesLine: `${styles.line}`,
        userData: new UserData("div", {
          avatar: new Avatar("div", {
            unionSVG: `${user.avatar}`,
            width: "34",
            height: "34",
            attr: {
              class: `${styles.avatarUser}`,
            },
          }),
          stylesName: `${styles.name}`,
          userName: `${user.name}`,
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
      })),
      (props.attr = {
        class: `${styles.chatsWrapper}`,
      });
    super("section", props);
    this._chatsController.getListChats();
    store.on(StoreEvents.Updated, () => this.update());
  }

  update() {
    // const selectedChat = store.getState()["selectedChat"];
    // if (selectedChat) {
      // this.setProps({
      //   userChat: ne
      // });
    // }
    // if (chats) {
    //     const chatComponents: Array<ChatItemComponent> =
    //         chats.map((c: ChatItem) => new ChatItemComponent(c));
    //     this.setProps({ chatComponents: chatComponents } as ChatFeedProps);
    // }
  }

  messageForm(event: SubmitEvent) {
    event.preventDefault();
    const input: HTMLInputElement | null =
      document.querySelector('[name="message"]');
    if (!input) {
      return;
    }
    const inputValue = input.value.trim();
    if (inputValue === "") {
      console.log("empty message <-------");
    } else {
      console.log("inputValue <-------", inputValue);
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
      const chatId = 4315;
      this._chatsController.addUsersToChat({ login: inputValue, chatId });

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
      const chatId = 4315;
      this._chatsController.deleteUsersToChat({ login: inputValue, chatId });

      modalWindow?.classList.remove(`${styles.modalWindowV}`);
      modalWindow?.classList.add(`${styles.modalWindowH}`);
    });
  }

  toggleUpload() {
    const block = document.querySelector('[data-actions="uploadFiles"]');
    block?.classList.toggle(`${styles.displayBlock}`);
  }

  addChat() {
    const modalWindow = document.querySelector(
      '[data-name="modalWindowCreateChat"]'
    );
    modalWindow?.classList.remove(`${styles.modalWindowH}`);
    modalWindow?.classList.add(`${styles.modalWindowV}`);

    modalWindow?.addEventListener("click", (event) => {
      if (event.target === modalWindow) {
        modalWindow?.classList.remove(`${styles.modalWindowV}`);
        modalWindow?.classList.add(`${styles.modalWindowH}`);
      }
    });

    const form = document.querySelector('[data-name="createChat_modal"]');
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input: HTMLInputElement | null = document.querySelector(
        '[name="createChat"]'
      );
      if (!input) {
        return;
      }
      const inputValue = input.value.trim();
      this._chatsController.createChat({ title: inputValue });

      modalWindow?.classList.remove(`${styles.modalWindowV}`);
      modalWindow?.classList.add(`${styles.modalWindowH}`);
    });
  }

  render() {
    return this._compile(tpl, this._props);
  }
}
