import HTTPTransport from "../../services/HTTPTransport";

const deleteChatAPIInstance = new HTTPTransport();

class DeleteChatAPI {
  request(data: { chatId: number }) {
    return deleteChatAPIInstance.delete("/chats", {
      data: { chatId: data.chatId },
    });
  }
}

export default DeleteChatAPI;
