import tpl from "./registration.tmpl";
import Block from "../../services/Block";
import Form from "../../components/form/form";

type RegistrationProps = {
  className: string;
  form: Form;
  url: string;
  title: string;
  attr: Record<string, string>;
};

export default class Registration extends Block<RegistrationProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
