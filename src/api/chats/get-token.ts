import HTTPTransport from "../../services/HTTPTransport";

const getTokenAPIInstance = new HTTPTransport();

class GetTokenAPI {
  request(id: number) {
    return getTokenAPIInstance.post(`/chats/token/${id}`);
  }
}

export default GetTokenAPI;
