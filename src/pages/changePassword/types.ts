import Avatar from "../../components/avatar/avatar";
import GoBack from "../../components/goBack/goBack";
import ChangeBlockPassword from "./blockPassword/blockPassword";

export class ChangePasswordProps {
  goBack!: GoBack;
  classData!: string;
  avatar!: Avatar;
  blockPassword!: ChangeBlockPassword;
  attr!: Record<string, string>;
}
