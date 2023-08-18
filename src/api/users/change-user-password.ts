import HTTPTransport from "../../services/HTTPTransport";
import { ChangeUserPasswordFormModel } from "../../types/file";

const changeUserPasswordAPIInstance = new HTTPTransport();

class ChangeUserPasswordAPI {
  request(data: ChangeUserPasswordFormModel) {
    return changeUserPasswordAPIInstance.put("/user/password", { data });
  }
}

export default ChangeUserPasswordAPI;