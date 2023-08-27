export type RegistrationFormModel = {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  phone: string;
  password: string;
};

export type LoginFormModel = {
  login: string;
  password: string;
};

export type ChangeUserProfileFormModel = {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
};

export type ChangeUserPasswordFormModel = {
  oldPassword: string;
  newPassword: string;
};
