import ChangeUserAvatarAPI from "../api/users/change-user-avatar";
import ChangeUserPasswordAPI from "../api/users/change-user-password";
import ChangeUserProfileAPI from "../api/users/change-user-profile";
import FindUsersAPI from "../api/users/find-users-by-login";
import Router from "../router";
import {
  ChangeUserProfileFormModel,
  ChangeUserPasswordFormModel,
} from "../types/file";
import store from "../services/Store";

const changeUserProfileAPI = new ChangeUserProfileAPI();
const changeUserPasswordAPI = new ChangeUserPasswordAPI();
const changeUserAvatarAPI = new ChangeUserAvatarAPI();
const findUsersAPI = new FindUsersAPI();
const app = document.querySelector("#app");

const router = new Router(app);

class UsersController {
  public changeUserProfile(data: ChangeUserProfileFormModel) {
    try {
      changeUserProfileAPI.request(data);
      router.go("/settings");
    } catch (error) {
      console.log("error <-------");
      // Логика обработки ошибок
    }
  }

  public async changeUserPassword(data: ChangeUserPasswordFormModel) {
    try {
      await changeUserPasswordAPI.request(data);
      router.go("/settings");
    } catch (error) {
      console.log("error <-------");
      // Логика обработки ошибок
    }
  }

  public changeUserAvatar(file: File) {
    try {
      changeUserAvatarAPI.request(file).then((data) => {
        store.set("userData", JSON.parse(data.response));
      });
    } catch (error) {
      console.log("error <-------");
      // Логика обработки ошибок
    }
  }

  public async findUsersByLogin(login: string) {
    try {
      await findUsersAPI.request(login);
    } catch (error) {
      console.log("error <-------");
      // Логика обработки ошибок
    }
  }
}

export default UsersController;
