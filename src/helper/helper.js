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

//getErrors function
export const getErrors = () => {
  let hasError = null,
    errors = null;

  const values = mapStateToKeys(state, "values");

  if (typeof validate === "boolean") {
    hasError = validate;
    errors = mapStateToKeys(state, "error");
  } else if (typeof validate === "function") {
    const { errors: errorsFromCB } = validate(values);
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
