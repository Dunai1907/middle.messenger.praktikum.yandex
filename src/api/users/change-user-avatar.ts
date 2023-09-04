import HTTPTransport from "../../services/HTTPTransport";

const changeUserAvatarAPIInstance = new HTTPTransport();

class ChangeUserAvatarAPI {
  request(file: File) {
    const data = new FormData();
    data.append("avatar", file);
    return changeUserAvatarAPIInstance.put("/user/profile/avatar", { data });
  }
}

export default ChangeUserAvatarAPI;
