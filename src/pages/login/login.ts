import tpl from "./login.tmpl";
import Block from "../../services/Block";
import Form from "../../components/form/form";

type LoginProps = {
  className: string;
  form: Form;
  url: string;
  title: string;
  attr: Record<string, string>;
};

export default class Login extends Block<LoginProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
