import AddUsersToChatAPI from "../api/chats/add-users-to-chat";
import CreateChatAPI from "../api/chats/create-chat";
import DeleteUsersFromChatAPI from "../api/chats/delete-users-from-chat";
import GetListChatsAPI from "../api/chats/get-list-chats";
import FindUsersAPI from "../api/users/find-users-by-login";
import store from "../services/Store";

const createChatAPI = new CreateChatAPI();
const getListChatsAPI = new GetListChatsAPI();
const findUsersByLoginAPI = new FindUsersAPI();
const addUsersToChatAPI = new AddUsersToChatAPI();
const deleteUsersFromChatAPI = new DeleteUsersFromChatAPI();

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

  public async getListChats() {
    try {
      getListChatsAPI.request().then((data) => {
        store.set("chatsList", JSON.parse(data.response));
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
}

export default ChatsController;
