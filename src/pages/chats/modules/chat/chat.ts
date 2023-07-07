import Handlebars from "handlebars";
import chat from "./chat.tmpl";
import { users } from "../../../../constants/constants";
import styles from "./chat.module.scss";

const template = Handlebars.compile(chat);

const arrChat: string[] = [];

users.forEach((item) => {
  const chat = template({
    stylesLine: `${styles.line}`,
    stylesChat: `${styles.chat}`,
    stylesAvatar: `${styles.avatar}`,
    avatar: `${item.avatar}`,
    stylesMain: `${styles.main}`,
    stylesWrap: `${styles.wrap}`,
    stylesName: `${styles.name}`,
    stylesSpanName: `${styles.span_name}`,
    name: `${item.name}`,
    stylesDate: `${styles.date}`,
    stylesSpanDate: `${styles.span_date}`,
    date: `${item.date}`,
    stylesText: `${styles.text}`,
    stylesSpanText: `${styles.span_text}`,
    text: `${item.text}`,
    stylesNumber: `${styles.number}`,
    stylesSpanNumber: `${styles.span_number}`,
    number: `${item.number}`,
  });
  arrChat.push(chat);
});

export default arrChat;
