export function isValidEmail(value: string) {
  const re = /^[a-zA-Z0-9_.-]+@[a-zA-Z]+.[a-zA-Z]+$/;

  return re.test(String(value).toLowerCase());
}

export function isValidLogin(value: string) {
  const re = /^(?=.*[a-zA-Z])[-\w\d]{3,20}$/;

  return re.test(String(value).toLowerCase());
}

export function isValidName(value: string) {
  // нет кириллицы
  const re = /^(?=.*[a-zA-Z])[-\w]{3,20}$/;

  return re.test(String(value).toLowerCase());
}

export function isValidPhone(value: string) {
  const re = /^[+]?[\d]{10,15}$/;

  return re.test(String(value).toLowerCase());
}

export function isValidPassword(value: string) {
  // не сделал на заглавную букву
  const re = /^(?=.*\d)[a-zA-Z\d]{8,40}$/;

  return re.test(String(value).toLowerCase());
}
