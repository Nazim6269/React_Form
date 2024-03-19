import { useState } from "react";
import { getErrors, mapValuesToState } from "../helper/helper";
import { deepClone } from "../utils/objectUtils";

/**
 * create forms using this useForm hook easily
 * @typedef {Object} Param
 * @property {Object} init
 * @property {(Object | boolean)} validate
 *
 *
 * @param {Param} param
 * @returns
 */

const useForm = ({ init }) => {
  const [state, setState] = useState(mapValuesToState(init));

  //handleChange function
  const handleChange = (e) => {
    const { name: key, value } = e.target;

    const oldState = deepClone(state);
    oldState[key].value = value;

    const values = mapStateToKeys(oldState, "value");
    const { errors } = checkValidity(values);

    if (oldState[key].touched && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = "";
    }

    oldState[key].focused = false;
    setState(oldState);
  };

  //handleFocus function
  const handleFocus = (e) => {
    const { name } = e.target;

    const oldState = deepClone(state);
    oldState[name].touched = true;

    if (!oldState[name].touched) {
      oldState[name].touched = true;
    }
  };

  //handleBlur function
  const handleBlur = (e) => {
    const key = e.target.name;
    const { errors } = getErrors();
    const oldState = deepClone(state);

    if (oldState[key].touched && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = "";
    }

    oldState[key].focused = false;
    setState(oldState);
  };

  //handleSubmit funciton
  const handleSubmit = (e, cb) => {
    e.preventDefault();
    const { hasError, errors, values } = getErrors();

    cb({
      hasError,
      errors,
      values,
      touched: mapStateToKeys(state, "touched"),
      focused: mapStateToKeys(state, "focused"),
    });
  };

  return {
    formState: state,
  };
};

export default useForm;
