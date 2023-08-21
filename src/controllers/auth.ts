import GetUserAPI from "../api/auth/get-user";
import LoginAPI from "../api/auth/login";
import RegistrationAPI from "../api/auth/registration";
import Router from "../router";
import { LoginFormModel, RegistrationFormModel } from "../types/file";
import store from "../services/Store";
import LogoutAPI from "../api/auth/logout";
import GetListChatsAPI from "../api/chats/get-list-chats";

const registrationApi = new RegistrationAPI();
const loginApi = new LoginAPI();
const userApi = new GetUserAPI();
const logoutApi = new LogoutAPI();
const getListChatsAPI = new GetListChatsAPI();
const app = document.querySelector("#app");

const router = new Router(app);

class AuthController {
  public registration(data: RegistrationFormModel) {
    try {
      registrationApi.request(data).then(() => {
        this.getUser();
      });
      router.go("/messenger");
    } catch (error) {
      console.log("error <-------");
    }
  }

  public login(data: LoginFormModel) {
    try {
      loginApi
        .request(data)
        .then(() => {
          this.getUser();
        })
        .then(() => {
          getListChatsAPI.request().then((data) => {
            store.set("chatsList", JSON.parse(data.response));
          });
        });
      router.go("/messenger");
    } catch (error) {
      console.log("error <-------");
    }
  }

  public getUser() {
    try {
      userApi.request().then((data) => {
        store.set("userData", JSON.parse(data.response));
      });
    } catch (error) {
      console.log("error <-------");
    }
  }

  public logout() {
    try {
      logoutApi.request();
      router.go("/");
    } catch (error) {
      console.log("error <-------");
    }
  }
}

export default AuthController;
