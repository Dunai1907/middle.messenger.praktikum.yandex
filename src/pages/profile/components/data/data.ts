import tpl from "./data.tmpl";
import Block from "../../../../services/Block";

type DataProfileProps = {
  className: string;
  name: string;
  classValue: string;
  value: string;
  attr: Record<string, string>;
};

export default class DataProfile extends Block<DataProfileProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
