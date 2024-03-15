export const mapValuesToState = (obj) => {
  return Object.keys(obj).reduce((acc, cur) => {
    acc[cur] = {
      value: obj[cur],
      error: "",
      focused: false,
      touched: false,
    };

    return acc;
  }, {});
};
