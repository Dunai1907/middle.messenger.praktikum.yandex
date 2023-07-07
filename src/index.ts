import login from "./pages/login/login";
import registration from "./pages/registration/registration";
import chats from "./pages/chats/chats";
import profile from "./pages/profile/profile";
import changeData from "./pages/change/modules/data/changeData";
import changePassword from "./pages/change/modules/password/changePassword";
import Router from "./router";
import "../styles/globals.css";

window.addEventListener("DOMContentLoaded", (event) => {
  const app = document.querySelector("#app");
  if (!app) {
    return;
  }

  const router = new Router(app);

  router
    .add("/", chats)
    .add("/login", login)
    .add("/registration", registration)
    .add("/profile", profile)
    .add("/changeData", changeData)
    .add("/changePassword", changePassword);

  router.go(window.location.pathname);
});
