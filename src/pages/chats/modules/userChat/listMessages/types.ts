import { MessageProps } from "../../../components/message/types";

export class ListMessagesProps {
  items?: MessageProps[];
  attr!: Record<string, string>;
}
