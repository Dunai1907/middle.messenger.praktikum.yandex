function formatDateForChat(dateString: string) {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };

  if (isToday(date)) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}.${minutes}`;
  } else {
    return date.toLocaleDateString("ru-RU", options as {});
  }
}

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export default formatDateForChat;
