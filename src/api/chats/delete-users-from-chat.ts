import HTTPTransport from "../../services/HTTPTransport";

const deleteUsersFromChatAPIInstance = new HTTPTransport();

class DeleteUsersFromChatAPI {
  request(data: { users: number[]; chatId: number }) {
    return deleteUsersFromChatAPIInstance.delete("/chats/users", { data });
  }
}

export default DeleteUsersFromChatAPI;
