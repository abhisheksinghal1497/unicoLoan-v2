import moment from "moment";

export function getDateYearsBack(year) {
  const currentDate = moment();
  const date18YearsBack = currentDate.subtract(18, "years");
  date18YearsBack.year(year);
  return new Date(date18YearsBack.format("YYYY-MM-DD"));
}
