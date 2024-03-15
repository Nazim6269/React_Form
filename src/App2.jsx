import { useState } from "react";
import Button from "../src/Components/ui/button/Button";
import "./App.css";
import InputGroup from "./Components/shared/InputGroup";
import { deepClone } from "./utils/objectUtils";

//initial form state
const initialFormState = {
  title: {
    value: "",
    error: "",
    focus: false,
  },
  bio: {
    value: "",
    error: "",
    focus: false,
  },
  skills: {
    value: "",
    error: "",
    focus: false,
  },
};

//app component starts from here
function App() {
  const [state, setState] = useState({ ...initialFormState });

  const mapStateToValues = (state) => {
    return Object.keys(state).reduce((acc, cur) => {
      acc[cur] = state[cur].value;
      return acc;
    }, {});
  };

  //handle change funciton
  const handleChange = (e) => {
    const { name: key, value } = e.target;
    const oldState = deepClone(state);
    oldState[key].value = value;
    const values = mapStateToValues(oldState);

    const { errors } = chechValidity(values);

    if (oldState[key].focus && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = "";
    }

    setState(oldState);
  };

  //handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const mapObj = mapStateToValues(state);

    const { isValid, errors } = chechValidity(mapObj);
    if (isValid) {
      console.log(isValid);
    } else {
      const oldState = deepClone(state);
      Object.keys(oldState).forEach((key) => {
        oldState[key].error = errors[key];
      });

      setState(oldState);
    }
  };

  //handle focus function
  const handleFocus = (e) => {
    const { name } = e.target;

    const oldState = deepClone(state);
    oldState[name].focus = true;
    setState(oldState);
  };

  //handle Blur function
  const handleBlur = (e) => {
    const key = e.target.name;
    const values = mapStateToValues(state);
    const { errors } = chechValidity(values);
    const oldState = deepClone(state);

    if (oldState[key].focus && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = "";
    }

    setState(oldState);
  };

  //check validity function
  const chechValidity = (values) => {
    const { title, bio, skills } = values;

    const errors = {};

    if (!title) {
      errors.title = "Invalid Title";
    }
    if (!bio) {
      errors.bio = "Invali Bio";
    }
    if (!skills) {
      errors.skills = "Invalid skills";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  return (
    <div id="root">
      <form
        style={{ width: "18rem", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <InputGroup
            value={state.title.value}
            name={"title"}
            placeholder={"Eneter your Name"}
            label={"Title"}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={state.title.error}
          />

          <InputGroup
            value={state.bio.value}
            name={"bio"}
            placeholder={"Eneter your Name"}
            label={"Bio"}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={state.bio.error}
          />

          <InputGroup
            value={state.skills.value}
            name={"skills"}
            placeholder={"Eneter your Name"}
            label={"Skills"}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={state.skills.error}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default App;
