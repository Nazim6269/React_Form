import { isObjEmpty } from "../utils/objectUtils";

//map values to state function
export const mapValuesToState = (obj, shouldClear = false) => {
  return Object.keys(obj).reduce((acc, cur) => {
    acc[cur] = {
      value: shouldClear ? "" : obj[cur],
      error: "",
      focused: false,
      touched: false,
    };

    return acc;
  }, {});
};

//map state to keys function
export const mapStateToKeys = (state, key) => {
  return Object.keys(state).reduce((acc, cur) => {
    acc[cur] = state[cur][key];
    return acc;
  }, {});
};

//getErrors function
export const getErrors = (state, validate) => {
  let hasError = null,
    errors = null;
  // console.log("validate", validate);
  const values = mapStateToKeys(state, "value");

  if (typeof validate === "boolean") {
    hasError = validate;
    errors = mapStateToKeys(state, "error");
  } else if (typeof validate === "function") {
    const errorsFromCB = validate(values);
    hasError = !isObjEmpty(errorsFromCB);
    errors = errorsFromCB;
  } else {
    throw new Error("validate property must be boolean or function");
  }

  return {
    values,
    errors,
    hasError,
  };
};
