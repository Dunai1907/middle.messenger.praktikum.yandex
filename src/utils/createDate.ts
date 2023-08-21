function createDate(timestamp: number) {
  const date = new Date(timestamp * 1000);

  const monthNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getUTCFullYear();
  const month = monthNames[monthIndex];

  const formattedDate = day + " " + month + " " + year;

  return formattedDate;
}

export default createDate;
