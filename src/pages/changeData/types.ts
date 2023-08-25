import Avatar from "../../components/avatar/avatar";
import GoBack from "../../components/goBack/goBack";
import { userData } from "../profile/types";
import ChangeBlockData from "./blockData/blockData";

export class ChangeDataProps {
  goBack!: GoBack;
  classData!: string;
  avatar!: Avatar;
  blockData!: ChangeBlockData;
  userData?: userData;
  attr!: Record<string, string>;
}
