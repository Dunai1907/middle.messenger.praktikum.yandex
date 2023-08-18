// import BaseAPI from "./base-api";
import HTTPTransport from "../../services/HTTPTransport";
import { RegistrationFormModel } from "../../types/file";

const registrationAPIInstance = new HTTPTransport();

class RegistrationAPI /* extends BaseAPI */ {
  request(data: RegistrationFormModel) {
    return registrationAPIInstance.post("/auth/signup", { data });
  }
}

export default RegistrationAPI;
