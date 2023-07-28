import { formatISO, subYears } from "date-fns";
import differenceInYears from "date-fns/differenceInYears";

export const calculateAge = (birthdate: Date) =>
  differenceInYears(new Date(), birthdate);

export const convertAgetoDate = (age: number) =>
  new Date(formatISO(subYears(new Date(), age), { representation: "date" }));
