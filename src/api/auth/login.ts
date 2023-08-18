import HTTPTransport from "../../services/HTTPTransport";
import { LoginFormModel } from "../../types/file";

const loginAPIInstance = new HTTPTransport();

class LoginAPI /* extends BaseAPI */ {
  request(data: LoginFormModel) {
    return loginAPIInstance.post("/auth/signin", { data });
  }
}

export default LoginAPI;
