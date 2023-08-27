import HTTPTransport from "../../services/HTTPTransport";
import { ChangeUserProfileFormModel } from "../../types/file";

const changeUserProfileAPIInstance = new HTTPTransport();

class ChangeUserProfileAPI {
  request(data: ChangeUserProfileFormModel) {
    return changeUserProfileAPIInstance.put("/user/profile", { data });
  }
}

export default ChangeUserProfileAPI;
