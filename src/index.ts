import LoginPage from "./pages/login";
import RegistrationPage from "./pages/registration";
import ProfilePage from "./pages/profile";
import ChangeDataPage from "./pages/changeData";
import ChangePasswordPage from "./pages/changePassword";
import Router from "./router";
import "../styles/globals.scss";
import ChatsPage from "./pages/chats";
import notFoundPage from "./pages/404";

window.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector("#app");
  if (!app) {
    return;
  }

  const router = new Router(app);

  router
    .add("/messenger", new ChatsPage())
    .add("/", new LoginPage())
    .add("/sign-up", new RegistrationPage())
    .add("/settings", new ProfilePage())
    .add("/change-data", new ChangeDataPage())
    .add("/change-password", new ChangePasswordPage())
    .add("/not-found", notFoundPage);

  router.go(window.location.pathname);
});
