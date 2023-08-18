import HTTPTransport from "../../services/HTTPTransport";
// import { RegistrationFormModel } from "../types/file";

const getUserAPIInstance = new HTTPTransport();

class GetUserAPI /* extends BaseAPI */ {
  request() {
    return getUserAPIInstance.get("/auth/user");
  }
}

export default GetUserAPI;
