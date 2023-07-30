import tpl from "./404.tmpl";
import Block from "../../services/Block";

type NotFoundProps = {
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

export default class NotFound extends Block<NotFoundProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
