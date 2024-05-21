import moment from "moment";

export function getDateYearsBack(year) {
  const currentDate = moment();
  const date18YearsBack = currentDate.subtract(18, "years");
  date18YearsBack.year(year);
  return new Date(date18YearsBack.format("YYYY-MM-DD"));
}

export const formatDateDayMonthYear = (time) => {
  const date = moment(time);
  const formattedDate = date.format("ddd Do MMMM YY"); // Output: "Fri 3rd March 24"
  return formattedDate;
};

export const timeAmPm = (time) => {
  const date = moment(time);
  const hours = date.format("h");
  const minutes = date.format("mm");
  const amPm = date.format("A");
  const formattedTime = `${hours}:${minutes} ${amPm}`; // Output: "12:34 PM"
  return formattedTime;
};
