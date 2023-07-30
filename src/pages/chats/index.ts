import { messages, users } from "../../constants/constants";
import Chats from "./chats";
import styles from "./chats.module.scss";
import ListChats from "./modules/listChats/listChats";
import UserChat from "./modules/userChat/userChat";
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
import ModalWindow from "./components/modalWindow/modalWindow";
import Button from "../../components/button/button";

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

const arrChat: any[] = [];
users.forEach((item) => {
  const chat = {
    stylesChat: `${styles.chat}`,
    stylesAvatar: `${styles.avatar}`,
    avatar: `${item.avatar}`,
    stylesMain: `${styles.main}`,
    stylesWrap: `${styles.wrap}`,
    stylesName: `${styles.name}`,
    stylesSpanName: `${styles.spanName}`,
    name: `${item.name}`,
    stylesDate: `${styles.date}`,
    stylesSpanDate: `${styles.spanDate}`,
    date: `${item.date}`,
    stylesText: `${styles.text}`,
    stylesSpanText: `${styles.spanText}`,
    text: `${item.text}`,
    stylesNumber: `${styles.number}`,
    stylesSpanNumber: `${styles.spanNumber}`,
    number: `${item.number}`,
  };
  arrChat.push(chat);
});

const addUser = () => {
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
};

const deleteUser = () => {
  const block = document.querySelector('[data-actions="actionsUser"]');
  const modalWindow = document.querySelector('[data-name="modalWindowDelete"]');
  modalWindow?.classList.remove(`${styles.modalWindowH}`);
  modalWindow?.classList.add(`${styles.modalWindowV}`);
  block?.classList.toggle(`${styles.displayBlock}`);

  modalWindow?.addEventListener("click", (event) => {
    if (event.target === modalWindow) {
      modalWindow?.classList.remove(`${styles.modalWindowV}`);
      modalWindow?.classList.add(`${styles.modalWindowH}`);
    }
  });
};

const toggleActions = () => {
  const block = document.querySelector('[data-actions="actionsUser"]');
  block?.classList.toggle(`${styles.displayBlock}`);
  const buttonAdd = document.querySelector('[data-action="addUser"]');
  const buttonDelete = document.querySelector('[data-action="deleteUser"]');
  buttonAdd?.addEventListener("click", addUser);
  buttonDelete?.addEventListener("click", deleteUser);
};

const toggleUpload = () => {
  const block = document.querySelector('[data-actions="uploadFiles"]');
  block?.classList.toggle(`${styles.displayBlock}`);
};

const messageForm = (event: SubmitEvent) => {
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
};

const listChats = new ListChats("aside", {
  hrefValue: "/profile",
  stylesButtonProfile: `${styles.buttonProfile}`,
  stylesForm: `${styles.form}`,
  searchSVG: `${searchSVG}`,
  stylesSearch: `${styles.search}`,
  items: arrChat,
  profileSVG: `${profileSVG}`,
  attr: {
    class: `${styles.listChats}`,
  },
});

const avatar = new Avatar("div", {
  unionSVG: `${user.avatar}`,
  width: "34",
  height: "34",
  attr: {
    class: `${styles.avatarUser}`,
  },
});

const imgButtonActions = new ImgButton("button", {
  buttonSVG: `${actionsSVG}`,
  attr: {
    class: `${styles.actions}`,
  },
  events: {
    click: toggleActions,
  },
});

const imgButtonUpload = new ImgButton("button", {
  buttonSVG: `${uploadSVG}`,
  attr: {
    class: `${styles.upload}`,
    type: "button",
  },
  events: {
    click: toggleUpload,
  },
});

const imgButtonSubmit = new ImgButton("button", {
  buttonSVG: `${arrowRightSVG}`,
  attr: {
    class: `${styles.submit}`,
    type: "submit",
  },
});

const userData = new UserData("div", {
  avatar,
  stylesName: `${styles.name}`,
  userName: `${user.name}`,
  imgButtonActions,
  attr: {
    class: `${styles.userData}`,
  },
});

const listMessages = new ListMessages("div", {
  items: arrMessage,
  attr: {
    class: `${styles.listMessages}`,
  },
});

const createMessage = new CreateMessage("form", {
  imgButtonUpload,
  stylesEnter: `${styles.enter}`,
  imgButtonSubmit,
  attr: {
    class: `${styles.createMessage}`,
  },
  events: {
    submit: messageForm,
  },
});

const blockActions = new WindowActions("div", {
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
});

const blockUpload = new WindowActions("div", {
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
});

const userChat = new UserChat("section", {
  stylesLine: `${styles.line}`,
  userData,
  blockActions,
  listMessages,
  blockUpload,
  createMessage,
  attr: {
    class: `${styles.userChat}`,
  },
});

const buttonAdd = new Button("button", {
  classSpan: `${styles.buttonText}`,
  name: "Добавить",
  attr: {
    class: `${styles.buttonModalWindow}`,
    type: "submit",
  },
});

const buttonDelete = new Button("button", {
  classSpan: `${styles.buttonText}`,
  name: "Удалить",
  attr: {
    class: `${styles.buttonModalWindow}`,
    type: "submit",
  },
});

const modalWindowAdd = new ModalWindow("div", {
  classContent: `${styles.modalContent}`,
  classSpan: `${styles.spanModalWindow}`,
  name: "Добавить пользователя",
  dataName: "addUser_modal",
  classLabel: `${styles.labelModalWindow}`,
  labelName: "login",
  inputName: "addNewUser",
  classInput: `${styles.inputModalWindow}`,
  classLine: `${styles.line}`,
  buttonAction: buttonAdd,
  attr: {
    class: `${styles.modalWindowH}`,
    "data-name": "modalWindowAdd",
  },
});

const modalWindowDelete = new ModalWindow("div", {
  classContent: `${styles.modalContent}`,
  classSpan: `${styles.spanModalWindow}`,
  name: "Удалить пользователя",
  dataName: "deleteUser_modal",
  classLabel: `${styles.labelModalWindow}`,
  labelName: "login",
  inputName: "deleteUser",
  classInput: `${styles.inputModalWindow}`,
  classLine: `${styles.line}`,
  buttonAction: buttonDelete,
  attr: {
    class: `${styles.modalWindowH}`,
    "data-name": "modalWindowDelete",
  },
});

const chatsPage = new Chats("section", {
  modalWindowAdd,
  modalWindowDelete,
  listChats,
  userChat,
  attr: {
    class: `${styles.chatsWrapper}`,
  },
});

export default chatsPage;
