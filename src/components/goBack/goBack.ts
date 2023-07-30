import tpl from "./goBack.tmpl";
import Block from "../../services/Block";

type GoBackProps = {
  url: string;
  arrowLeftSVG: string;
  attr: {};
};

export default class GoBack extends Block<GoBackProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
