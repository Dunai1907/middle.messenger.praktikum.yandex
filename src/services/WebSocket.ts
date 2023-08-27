import ChatMessage from "../models/chatMessage";
import { User } from "../models/user";
import store, { StoreEvents } from "./Store";

export default class CommunicationWebSocket {
  private socket: WebSocket;
  constructor(userId: number, chatId: number, token: string) {
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );

    this.socket.addEventListener("open", () => {
      console.log("Соединение установлено");
      setInterval(() => this.ping(), 5000);
    });

    this.socket.addEventListener("close", (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener("message", (event) => {
      console.log("Получены данные", event.data);
      try {
        const data = JSON.parse(event.data);

        if (
          data &&
          data.type !== "error" &&
          data.type !== "pong" &&
          data.type !== "user connected"
        ) {
          this.getViewMessages(data);
        }
      } catch (error) {
        console.log(error);
      }
    });

    this.socket.addEventListener("error", (event) => {
      console.log("Ошибка", event);
    });
  }

  sendMessage(message: string) {
    this.socket.send(
      JSON.stringify({
        type: "message",
        content: message,
      })
    );
  }

  ping() {
    this.socket.send(
      JSON.stringify({
        type: "ping",
      })
    );
  }

  getViewMessages(data: any) {
    const messages = store.getState()["listMessages"] ?? [];
    if (Array.isArray(data)) {
      data.sort((a: ChatMessage, b: ChatMessage) => {
        if (a.time > b.time) {
          return 1;
        }
        if (a.time < b.time) {
          return -1;
        }
        return 0;
      });
      store.set("listMessages", [...messages, ...data]);
    } else {
      store.set("listMessages", [...messages, data]);
    }
    const mess = store.getState()["listMessages"];
    let lastMessage = {} as ChatMessage;

    if (Array.isArray(mess) && mess.length) {
      lastMessage = mess[mess.length - 1];
    }
    if (lastMessage) {
      const chatUsers = store.getState()["chatUsers"] as User[];
      if (chatUsers) {
        store.getState()["selectedChat"]["last_message"] = {
          user: chatUsers.find((user) => user.id === lastMessage.user_id),
          time: lastMessage.time,
          content: lastMessage.content,
        };
      }
    }
    store.emit(StoreEvents.Updated);
  }

  getOldMessages() {
    const socket = this.socket;
    const getMessages = function () {
      socket.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        })
      );
    };
    if (this.socket.readyState === this.socket.CONNECTING) {
      this.socket.addEventListener("open", () => getMessages());
    } else {
      getMessages();
    }
  }
}
