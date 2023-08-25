import HTTPTransport from "../../services/HTTPTransport";

const getChatUsersAPIInstance = new HTTPTransport();

class GetChatUsersAPI {
  request(id: number) {
    return getChatUsersAPIInstance.get(`/chats/${id}/users`);
  }
}

export default GetChatUsersAPI;