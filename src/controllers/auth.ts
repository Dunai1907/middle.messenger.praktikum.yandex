import GetUserAPI from "../api/auth/get-user";
import LoginAPI from "../api/auth/login";
import RegistrationAPI from "../api/auth/registration";
import Router from "../router";
import { LoginFormModel, RegistrationFormModel } from "../types/file";
// import store from "../services/Store";
import LogoutAPI from "../api/auth/logout";

const registrationApi = new RegistrationAPI();
const loginApi = new LoginAPI();
const userApi = new GetUserAPI();
const logoutApi = new LogoutAPI();
const app = document.querySelector("#app");

const router = new Router(app);

class AuthController {
  public async registration(data: RegistrationFormModel) {
    try {
      await registrationApi.request(data);
      router.go("/messenger");
    } catch (error) {
      console.log("error <-------");
    }
  }

  public login(data: LoginFormModel) {
    try {
      loginApi.request(data);

      router.go("/messenger");
    } catch (error) {
      console.log("error <-------");
    }
  }

  public getUser() {
    try {
      userApi.request().then((data) => {
        console.log("data <-------", JSON.parse(data.response));
        // store.set("user", JSON.parse(data.response));
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
