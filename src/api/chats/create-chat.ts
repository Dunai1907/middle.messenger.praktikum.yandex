import HTTPTransport from "../../services/HTTPTransport";

const createChatAPIInstance = new HTTPTransport();

class CreateChatAPI {
  request(data: { title: string }) {
    return createChatAPIInstance.post("/chats", { data });
  }
}

export default CreateChatAPI;
