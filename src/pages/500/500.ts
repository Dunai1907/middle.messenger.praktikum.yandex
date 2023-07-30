import tpl from "./500.tmpl";
import Block from "../../services/Block";

type ServerErrorProps = {
  classError: string;
  classSpanError: string;
  error: string;
  classDescription: string;
  classSpanDescription: string;
  description: string;
  classBack: string;
  back: string;
  attr: Record<string, string>;
};

export default class ServerError extends Block<ServerErrorProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
