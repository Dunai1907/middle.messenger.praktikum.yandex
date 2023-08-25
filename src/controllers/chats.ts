import AddUsersToChatAPI from "../api/chats/add-users-to-chat";
import CreateChatAPI from "../api/chats/create-chat";
import DeleteUsersFromChatAPI from "../api/chats/delete-users-from-chat";
import GetChatUsersAPI from "../api/chats/get-chat-users";
import GetListChatsAPI from "../api/chats/get-list-chats";
import GetTokenAPI from "../api/chats/get-token";
import FindUsersAPI from "../api/users/find-users-by-login";
import store from "../services/Store";
import CommunicationWebSocket from "../services/WebSocket";

const createChatAPI = new CreateChatAPI();
const getListChatsAPI = new GetListChatsAPI();
const findUsersByLoginAPI = new FindUsersAPI();
const addUsersToChatAPI = new AddUsersToChatAPI();
const deleteUsersFromChatAPI = new DeleteUsersFromChatAPI();
const getTokenAPI = new GetTokenAPI();
const getChatUsersAPI = new GetChatUsersAPI();

class ChatsController {
  public createChat(data: { title: string }) {
    try {
      createChatAPI.request(data).then(() => {
        this.getListChats();
      });
    } catch (error) {
      console.log("error <-------");
    }
  }

  public getListChats() {
    try {
      getListChatsAPI.request().then((data) => {
        store.set("chatsList", JSON.parse(data.response));
        const state = store.getState();
        if (!state["listSockets"]) {
          store.set("listSockets", new Map<number, WebSocket>());
        }
        const listChats = state["chatsList"];
        listChats.forEach((chat: any) => {
          this.getNewSocket(chat.id).then((socket: CommunicationWebSocket) => {
            state["listSockets"][chat.id] = socket;
          });
        });
      });
    } catch (error) {
      console.log("error <-------");
    }
  }

  public async addUsersToChat(data: { login: string; chatId: number }) {
    try {
      const { login, chatId } = data;
      const result = await findUsersByLoginAPI.request(login);
      const users = JSON.parse(result.response);
      const usersId = users.map((user: any) => user.id);
      await addUsersToChatAPI.request({ users: usersId, chatId });
    } catch (error) {
      console.log("error <-------");
    }
  }

  public async deleteUsersToChat(data: { login: string; chatId: number }) {
    try {
      const { login, chatId } = data;
      const result = await findUsersByLoginAPI.request(login);
      const users = JSON.parse(result.response);
      const usersId = users.map((user: any) => user.id);
      await deleteUsersFromChatAPI.request({ users: usersId, chatId });
    } catch (error) {
      console.log("error <-------");
    }
  }

  public async getNewSocket(chatId: number): Promise<CommunicationWebSocket> {
    const state = store.getState();
    const user = state["userData"];
    const sockets = state["listSockets"] as Map<number, CommunicationWebSocket>;

    if (sockets && sockets.has(chatId)) {
      return new Promise<CommunicationWebSocket>(() => sockets.get(chatId));
    } else {
      return await getTokenAPI.request(chatId).then((data) => {
        const token = JSON.parse(data.response).token;
        const socket = new CommunicationWebSocket(user?.id, chatId, token);
        state["listSockets"][chatId] = socket;
        return socket;
      });
    }
  }

  public selectedChat(chat: any) {
    this.getNewSocket(chat.id).then((socket: CommunicationWebSocket) => {
      store.set("selectedChat", chat);
      store.set("currentSocket", socket);
      store.set("listMessages", []);
      this.getChatUsers(chat.id);
      socket.getOldMessages();
    });
  }

  public async getChatUsers(id: number) {
    try {
      const result = await getChatUsersAPI.request(id);
      const users = JSON.parse(result.response);
      store.set("chatUsers", users);
    } catch (error) {
      console.log("error <-------");
    }
  }
}

export default ChatsController;
