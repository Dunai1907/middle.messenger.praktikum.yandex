import tpl from "./listMessages.tmpl";
import Block from "../../../../../services/Block";

type MessageProp = {
  classDate: string;
  date: string;
  classUserMessage: string;
  classContent: string;
  content: string;
  classImage: string;
  delivered: string;
  classTime: string;
  time: string;
};

type ListMessagesProps = {
  items: MessageProp[];
  attr: Record<string, string>;
};

export default class ListMessages extends Block<ListMessagesProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
