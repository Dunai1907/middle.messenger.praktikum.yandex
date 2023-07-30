import tpl from "./windowActions.tmpl";
import Block from "../../../../services/Block";

type ActionProp = {
  classWrapperAction: string;
  action?: string;
  classWrapperImage: string;
  image: string;
  className: string;
  name: string;
};

type WindowActionsProps = {
  items: ActionProp[];
  attr: Record<string, string>;
};

export default class WindowActions extends Block<WindowActionsProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
