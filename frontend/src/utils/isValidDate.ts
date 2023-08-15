import parse from "date-fns/parse";

export const isValidDate = (str: string, format: string) => {
  const parsedStr = parse(str, format, new Date());
  return !isNaN(parsedStr as unknown as number);
};
