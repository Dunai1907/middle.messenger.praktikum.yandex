import HTTPTransport from "../../services/HTTPTransport";

const getListChatsAPIInstance = new HTTPTransport();

class GetListChatsAPI {
  request() {
    return getListChatsAPIInstance.get("/chats");
  }
}

export default GetListChatsAPI;