import loginPage from "./pages/login";
import registrationPage from "./pages/registration";
import profilePage from "./pages/profile";
import changeDataPage from "./pages/changeData";
import changePasswordPage from "./pages/changePassword";
import Router from "./router";
import "../styles/globals.scss";
import chatsPage from "./pages/chats";

window.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector("#app");
  if (!app) {
    return;
  }

  const router = new Router(app);

  router
    .add("/messenger", chatsPage)
    .add("/", loginPage)
    .add("/sign-up", registrationPage)
    .add("/settings", profilePage)
    .add("/change-data", changeDataPage)
    .add("/change-password", changePasswordPage);

  router.go(window.location.pathname);
});
