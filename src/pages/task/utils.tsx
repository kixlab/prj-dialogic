export const getStatus = (stepNum: number, step: number) => {
  if (stepNum < step) return "done";
  else if (stepNum == step) return "onGoing";
  else return "pending";
};
