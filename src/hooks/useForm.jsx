import { useState } from "react";
import { mapValuesToState } from "../helper/helper";

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

  return {
    formState: state,
  };
};

export default useForm;
