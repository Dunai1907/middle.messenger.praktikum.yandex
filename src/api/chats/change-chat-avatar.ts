import HTTPTransport from "../../services/HTTPTransport";

const changeChatAvatarAPIInstance = new HTTPTransport();

class ChangeChatAvatarAPI {
  request(id: number, file: File) {
    const data = new FormData();
    data.append("chatId", `${id}`);
    data.append("avatar", file);

    return changeChatAvatarAPIInstance.put("/chatsu/avatar", { data });
  }
}

export default ChangeChatAvatarAPI;
