import styles from "./registration.module.scss";
import * as input from "../../components/input/input";
import {
  buttonBigRegistration,
  buttonSmallRegistration,
} from "../../components/button/button";

const registration = document.createElement("section");
registration.classList.add(styles.regisration_wrapper);

registration.innerHTML = `
  <div class=${styles.form_block}>
    <Form
      class=${styles.form}
    >
      ${buttonBigRegistration}
      ${input.inputEmail}
      <hr class=${styles.line} />
      ${input.inputLogin}
      <hr class=${styles.line} />
      ${input.inputFirstName}
      <hr class=${styles.line} />
      ${input.inputLastName}
      <hr class=${styles.line} />
      ${input.inputPhone}
      <hr class=${styles.line} />
      ${input.inputPassword}
      <hr class=${styles.line} />
      ${input.inputRepeatPassword}
      <hr class=${styles.line} />
      ${buttonSmallRegistration}
    </form>
    <a class=${styles.login} href="/registration">
      Войти
    </a>
  </div>`;

export default registration;
