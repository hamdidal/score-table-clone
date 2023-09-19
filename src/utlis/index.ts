import dayjs from "dayjs";

export const generateRandomDate = () => {
  const startDatetime = new Date(2022, 0, 1);
  const finishDatetime = new Date();
  return dayjs(
    startDatetime.getTime() +
      Math.random() * (finishDatetime.getTime() - startDatetime.getTime())
  );
};

export const generateBetRate = () =>
  Number((Math.random() * 34 + 1).toFixed(2));
