import React from "react";
import InputGroup from "./Components/shared/InputGroup";
import Task from "./Components/task/Task";
import Button from "./Components/ui/button/Button";
import useForm from "./hooks/useForm";

const init = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "First name is required";
  }
  if (!values.lastName) {
    errors.lastName = "Last Name is required";
  }
  if (!values.email) {
    errors.email = "Email is Required";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  }

  return errors;
};

const App3 = () => {
  const {
    formState: state,
    handleBlur,
    handleChange,
    handleFocus,
    handleSubmit,
    clear,
  } = useForm({
    init,
    validate,
  });

  const cb = (hasError, errors, values) => {
    //TODO: here errors is undefined
    console.log("i am inside cb", errors);
    if (hasError) {
      alert("[ERROR]", JSON.stringify(errors));
    } else {
      alert("[SUCCESS]", JSON.stringify(values));
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}> My Custom hook form </h2>
      <form
        style={{ width: "18rem", margin: "0 auto" }}
        onSubmit={(e) => handleSubmit(e, cb)}
      >
        <InputGroup
          value={state.firstName.value}
          label={"First Name"}
          name={"firstName"}
          placeholder={"Nazim"}
          error={state.firstName.error}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />

        <InputGroup
          value={state.lastName.value}
          label={"Last Name"}
          name={"lastName"}
          placeholder={"Uddin"}
          error={state.lastName.error}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />

        <InputGroup
          value={state.email.value}
          label={"E-mail"}
          name={"email"}
          placeholder={"example@gmail.com"}
          error={state.email.error}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />

        <InputGroup
          value={state.password.value}
          label={"Password"}
          name={"password"}
          placeholder={"****"}
          error={state.password.error}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />

        <Button type="reset" onClick={clear} style={{ marginRight: "4px" }}>
          Clear
        </Button>
        <Button type="submit">Submit</Button>
      </form>
      <hr />
      <Task />
    </div>
  );
};

export default App3;
