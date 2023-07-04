export const getDate = () => {
  let date = new Date();

  return {
    currentFullDate: date.toLocaleDateString(),
    joinMonth: date.getMonth(),
  };
};
