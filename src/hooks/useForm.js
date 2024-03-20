import { useState } from "react";
import { getErrors, mapStateToKeys, mapValuesToState } from "../helper/helper";
import { deepClone } from "../utils/objectUtils";

/**
 * create forms using this useForm hook easily
 * @typedef {Object} Param
 * @property {Object} init
 * @property {(Object | boolean)} validate
 * @param {Param} param
 * @returns
 */

const useForm = ({ init, validate }) => {
  const [state, setState] = useState(mapValuesToState(init));

  //handleChange function
  const handleChange = (e) => {
    const { name: key, value, type, checked } = e.target;

    const oldState = deepClone(state);
    if (type === "checkbox") {
      oldState[key].value = checked;
    } else {
      oldState[key].value = value;
    }
    // oldState[key].value = value;

    const values = mapStateToKeys(oldState, "value");
    const { errors } = getErrors(state, validate);

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
    oldState[name].focused = true;

    if (!oldState[name].touched) {
      oldState[name].touched = true;
    }

    setState(oldState);
  };

  //handleBlur function
  const handleBlur = (e) => {
    const key = e.target.name;
    const { errors } = getErrors(state, validate);

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
    const { hasError, errors, values } = getErrors(state, validate);
    console.log("errors", errors);
    cb({
      hasError,
      errors,
      values,
      touched: mapStateToKeys(state, "touched"),
      focused: mapStateToKeys(state, "focused"),
    });
  };

  //clear function
  const clear = () => {
    const newState = mapValuesToState(init, true);
    setState(newState);
  };

  return {
    formState: state,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit,
    clear,
  };
};

export default useForm;
