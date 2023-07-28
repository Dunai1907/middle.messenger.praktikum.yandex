export function isValidEmail(value: string): boolean {
  const re = /^[a-zA-Z0-9_.-]+@[a-zA-Z]+.[a-zA-Z]+$/;

  return re.test(String(value).toLowerCase());
}

export function isValidLogin(value: string): boolean {
  const re = /^(?=.*[a-zA-Z])[-\w\d]{3,20}$/;

  return re.test(String(value).toLowerCase());
}

export function isValidName(value: string): boolean {
  const re = /[a-zа-яA-ZА-Я-.]{1,}$/;

  return re.test(String(value).toLowerCase());
}

export function isValidPhone(value: string): boolean {
  const re = /^[+]?[\d]{10,15}$/;

  return re.test(String(value).toLowerCase());
}

export function isValidPassword(value: string): boolean {
  // не сделал на заглавную букву
  const re = /^(?=.*\d)[a-zA-Z\d]{8,40}$/;

  return re.test(String(value).toLowerCase());
}
