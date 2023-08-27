import HTTPTransport from "../../services/HTTPTransport";

const logoutAPIInstance = new HTTPTransport();

class LogoutAPI /* extends BaseAPI */ {
  request() {
    return logoutAPIInstance.post("/auth/logout");
  }
}

export default LogoutAPI;
