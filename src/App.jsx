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
function App() {
  const [formState, setFormState] = useState({ ...initialFormState });
  const [errors, setErrors] = useState({ ...initialFormState });

  const handleChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors } = chechValidity(formState);
    if (isValid) {
      console.log(isValid);
    } else {
      setErrors({ ...errors });
    }
  };

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
            name={"name"}
            placeholder={"Eneter your Name"}
            label={"Title"}
            onChange={handleChange}
          />

          <InputGroup
            value={formState.bio}
            name={"name"}
            placeholder={"Eneter your Name"}
            label={"Bio"}
            onChange={handleChange}
          />

          <InputGroup
            value={formState.skills}
            name={"name"}
            placeholder={"Eneter your Name"}
            label={"Skills"}
            onChange={handleChange}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default App;
