import tpl from "./createMessage.tmpl";
import Block from "../../../../../services/Block";
import ImgButton from "../../../components/imgButton/imgButton";

type CreateMessageProps = {
  imgButtonUpload: ImgButton;
  stylesEnter: string;
  imgButtonSubmit: ImgButton;
  attr: Record<string, string>;
  events: {
    // eslint-disable-next-line no-unused-vars
    submit: (event: SubmitEvent) => void;
  };
};

export default class CreateMessage extends Block<CreateMessageProps> {
  render() {
    return this._compile(tpl, this._props);
  }
}
