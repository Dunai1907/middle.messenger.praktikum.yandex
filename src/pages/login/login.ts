import styles from "./login.module.scss";
import { inputLogin, inputPassword } from "../../components/input/input";
import {
  buttonBigLogin,
  buttonSmallLogin,
} from "../../components/button/button";

const login = document.createElement("section");
login.classList.add(styles.login_wrapper);

login.innerHTML = `
  <div class=${styles.form_block}>
    <form
      class=${styles.form}
    >
      ${buttonBigLogin}
      ${inputLogin}
      <hr class=${styles.line} />
      ${inputPassword}
      <hr class=${styles.line} />
      ${buttonSmallLogin}
    </form>
    <a class=${styles.unregistered} href="/registration">
    Нет аккаунта?
    </a>
  </div>`;

export default login;
