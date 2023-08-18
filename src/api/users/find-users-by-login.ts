import HTTPTransport from "../../services/HTTPTransport";

const findUsersAPIInstance = new HTTPTransport();

class FindUsersAPI {
  request(login: string): any {
    return findUsersAPIInstance.post("/user/search", { data: { login } });
  }
}

export default FindUsersAPI;
