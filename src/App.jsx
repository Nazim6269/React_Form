import { useState } from "react";
import Button from "../src/Components/ui/button/Button";
import "./App.css";
import InputGroup from "./Components/shared/InputGroup";

//initial form state
const initialFormState = {
  title: "",
  bio: "",
  skills: "",
};

//app component starts from here
function App() {
  const [formState, setFormState] = useState({ ...initialFormState });
  const [errors, setErrors] = useState({ ...initialFormState });
  const [focuses, setFocuses] = useState({
    title: false,
    bio: false,
    skills: false,
  });

  //handle changel funciton
  const handleChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    const key = e.target.name;
    const { errors } = chechValidity(formState);

    if (!errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
    }
  };

  //handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, errors } = chechValidity(formState);
    if (isValid) {
      console.log(isValid);
    } else {
      setErrors({ ...errors });
    }
  };

  //handle focus function
  const handleFocus = (e) => {
    setFocuses((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  };

  //handle Blur function
  const handleBlur = (e) => {
    const key = e.target.name;
    const { errors } = chechValidity(formState);

    if (errors[key] && focuses[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: errors[key],
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
    }
  };

  //check validity function
  const chechValidity = (formState) => {
    const { title, bio, skills } = formState;

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
            value={formState.title}
            name={"title"}
            placeholder={"Eneter your Name"}
            label={"Title"}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={errors.title}
          />

          <InputGroup
            value={formState.bio}
            name={"bio"}
            placeholder={"Eneter your Name"}
            label={"Bio"}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={errors.bio}
          />

          <InputGroup
            value={formState.skills}
            name={"skills"}
            placeholder={"Eneter your Name"}
            label={"Skills"}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={errors.skills}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default App;
