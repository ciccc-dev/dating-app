import differenceInYears from "date-fns/differenceInYears";

export const calculateAge = (date: Date) => differenceInYears(new Date(), date);

export const convertToDateFormat = (date: string) =>
  date.substring(0, date.indexOf("T"));

export const convertToDateHourFormat = (date: string) =>
  date.substring(0, date.indexOf("T"));
