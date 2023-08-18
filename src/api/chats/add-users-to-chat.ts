import HTTPTransport from "../../services/HTTPTransport";

const addUsersToChatAPIInstance = new HTTPTransport();

class AddUsersToChatAPI {
  request(data: { users: number[], chatId: number }) {
    return addUsersToChatAPIInstance.put("/chats/users", { data });
  }
}

export default AddUsersToChatAPI;