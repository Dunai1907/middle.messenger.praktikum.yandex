import tpl from "./listChats.tmpl";
import Block from "../../../../services/Block";
import { ListChatsProps } from "./types";
import styles from "./listChats.module.scss";
import Button from "../../../../components/button/button";
import ModalWindow from "../../components/modalWindow/modalWindow";
import profileSVG from "../../../../../static/decor/profile.svg";
import searchSVG from "../../../../../static/decor/search.svg";
import ChatsController from "../../../../controllers/chats";
import store, { StoreEvents } from "../../../../services/Store";
import Chat from "../../components/chat/chat";

export default class ListChats extends Block<ListChatsProps> {
  private _chatsController = new ChatsController();
  constructor() {
    const props = {
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
      items: [],
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
    };
    super("aside", props);
    this._chatsController.getListChats();
    store.on(StoreEvents.Updated, () => this.update());
  }

  update() {
    const chatsList: any[] = store.getState()["chatsList"];

    if (chatsList) {
      const items = chatsList.map(
        (chat: {
          id: number;
          title: string;
          avatar: string;
          unread_count: number;
          last_message: {
            user: string;
            time: Date;
            content: string;
          };
        }) => new Chat(chat)
      );
      this.setProps({
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
        items: items,
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
      });
    }
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
      const chatsController = new ChatsController();
      chatsController.createChat({ title: inputValue });

      modalWindow?.classList.remove(`${styles.modalWindowV}`);
      modalWindow?.classList.add(`${styles.modalWindowH}`);
    });
  }

  render() {
    return this._compile(tpl, this._props);
  }
}
