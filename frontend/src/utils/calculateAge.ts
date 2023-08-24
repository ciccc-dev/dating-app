import differenceInYears from "date-fns/differenceInYears";

export const calculateAge = (birthdate: Date) =>
  differenceInYears(new Date(), birthdate);

export const convertToDateFormat = (birthdate: string) =>
  birthdate.substring(0, birthdate.indexOf("T"));
