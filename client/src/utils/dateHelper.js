const dateHelper = (log) => {
  const date = new Date(log);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = date.getHours() >= 12 ? "pm" : "am";
  const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes} ${period}`;
  return formattedDate;
};

export default dateHelper;
