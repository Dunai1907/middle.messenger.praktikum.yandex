import AddUsersToChatAPI from "../api/chats/add-users-to-chat";
import CreateChatAPI from "../api/chats/create-chat";
import DeleteUsersFromChatAPI from "../api/chats/delete-users-from-chat";
import GetListChatsAPI from "../api/chats/get-list-chats";
import FindUsersAPI from "../api/users/find-users-by-login";

const createChatAPI = new CreateChatAPI();
const getListChatsAPI = new GetListChatsAPI();
const findUsersByLoginAPI = new FindUsersAPI();
const addUsersToChatAPI = new AddUsersToChatAPI();
const deleteUsersFromChatAPI = new DeleteUsersFromChatAPI();

class ChatsController {
  public async createChat(data: { title: string }) {
    try {
      await createChatAPI.request(data);
    } catch (error) {
      console.log("error <-------");
    }
  }

  public async getListChats() {
    try {
      const chats = await getListChatsAPI.request();
      console.log("chats <-------", chats);
    } catch (error) {
      console.log("error <-------");
    }
  }

  public async addUsersToChat(data: { login: string; chatId: number }) {
    try {
      const { login, chatId } = data;
      const result = await  findUsersByLoginAPI.request(login);
      const users = JSON.parse(result.response);
      const usersId = users.map((user: any) => user.id)
      await addUsersToChatAPI.request({users: usersId, chatId});
    } catch (error) {
      console.log("error <-------");
    }
  }

  public async deleteUsersToChat(data: { login: string; chatId: number }) {
    try {
      const { login, chatId } = data;
      const result = await  findUsersByLoginAPI.request(login);
      const users = JSON.parse(result.response);
      const usersId = users.map((user: any) => user.id)
      await deleteUsersFromChatAPI.request({users: usersId, chatId});
    } catch (error) {
      console.log("error <-------");
    }
  }
}

export default ChatsController;
