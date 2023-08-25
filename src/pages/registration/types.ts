import Form from "../../components/form/form";

export class RegistrationProps {
  className!: string;
  form!: Form;
  url!: string;
  title!: string;
  attr!: Record<string, string>;
}
