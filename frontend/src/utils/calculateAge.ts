import differenceInYears from "date-fns/differenceInYears";

export const calculateAge = (birthdate: Date) =>
  differenceInYears(new Date(), birthdate);
