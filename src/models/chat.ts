import { User } from "./user";

export default class Chat {
  id!: number;
  title!: string;
  avatar!: string;
  unread_count!: number;
  last_message!: {
    user: User;
    time: Date;
    content: string;
  };
}
