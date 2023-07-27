import Profile from "./profile";
import Avatar from "../../components/avatar/avatar";
import arrowLeftSVG from "../../../static/decor/arrowLeft.svg";
import unionSVG from "../../../static/decor/union.svg";
import styles from "./profile.module.scss";
import BlockAction from "./modules/blockAction/blockAction";
import DataProfile from "./components/data/data";
import BlockData from "./modules/blockData/blockData";
import GoBack from "../../components/goBack/goBack";

const name = "Иван";

const data = {
  email: "pochta@yandex.ru",
  login: "ivanivanov",
  firstName: "Иван",
  secondName: "Иванов",
  chatsName: "Иван",
  phone: "+7 (909) 967 30 30",
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

const dataEmail = new DataProfile("div", {
  className: `${styles.span_name}`,
  name: "Почта",
  classValue: `${styles.span_value}`,
  value: `${data.email}`,
  attr: {
    class: `${styles.data_wrapper}`,
  },
});

const dataLogin = new DataProfile("div", {
  className: `${styles.span_name}`,
  name: "Логин",
  classValue: `${styles.span_value}`,
  value: `${data.login}`,
  attr: {
    class: `${styles.data_wrapper}`,
  },
});

const dataFirstName = new DataProfile("div", {
  className: `${styles.span_name}`,
  name: "Имя",
  classValue: `${styles.span_value}`,
  value: `${data.firstName}`,
  attr: {
    class: `${styles.data_wrapper}`,
  },
});

const dataSecondName = new DataProfile("div", {
  className: `${styles.span_name}`,
  name: "Фамилия",
  classValue: `${styles.span_value}`,
  value: `${data.secondName}`,
  attr: {
    class: `${styles.data_wrapper}`,
  },
});

const dataChatsName = new DataProfile("div", {
  className: `${styles.span_name}`,
  name: "Имя в чате",
  classValue: `${styles.span_value}`,
  value: `${data.chatsName}`,
  attr: {
    class: `${styles.data_wrapper}`,
  },
});

const dataPhone = new DataProfile("div", {
  className: `${styles.span_name}`,
  name: "Телефон",
  classValue: `${styles.span_value}`,
  value: `${data.phone}`,
  attr: {
    class: `${styles.data_wrapper}`,
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

const blockAction = new BlockAction("div", {
  classAction: `${styles.action}`,
  classMediumBlue: `${styles.mediumBlue}`,
  changeDataPath: "/change-data",
  changeData: "Изменить данные",
  classLine: `${styles.line}`,
  changePasswordPath: "/change-password",
  changePassword: "Изменить пароль",
  classRed: `${styles.red}`,
  path: "/",
  exit: "Выход",
  attr: {
    class: `${styles.blockAction}`,
  },
});

const profilePage = new Profile("div", {
  goBack,
  classData: `${styles.data}`,
  avatar,
  className: `${styles.name}`,
  name: `${name}`,
  blockData,
  blockAction,
  attr: {
    class: `${styles.profile_wrapper}`,
  },
});

export default profilePage;
