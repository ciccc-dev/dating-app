import differenceInYears from "date-fns/differenceInYears";

export const calculateAge = (date: Date) => differenceInYears(new Date(), date);

export const convertToDateFormat = (date: string) =>
  date.substring(0, date.indexOf("T"));

export const convertToDateHourFormat = (date: string) => {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const day = String(formattedDate.getDate()).padStart(2, "0");
  const hours = String(formattedDate.getHours()).padStart(2, "0");
  const minutes = String(formattedDate.getMinutes()).padStart(2, "0");
  const seconds = String(formattedDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
