import React from "react";
import useForm from "../../hooks/useForm";
import Button from "../ui/button/Button";

const init = {
  text: "",
  checked: false,
  group: "home",
  priority: "low",
};

const Task = () => {
  const { formState, handleChange, handleSubmit } = useForm({
    init,
    validate: true,
  });

  const submitCB = ({ values }) => {
    alert(JSON.stringify(values));
  };
  return (
    <div>
      Task
      <form onSubmit={(e) => handleSubmit(e, submitCB)}>
        <input
          type="checkbox"
          name={"checked"}
          checked={formState.checked.value}
          onChange={handleChange}
        />
        <input
          type="text"
          name="text"
          value={formState.text.value}
          onChange={handleChange}
        />
        <select name="group" onChange={handleChange}>
          <option value="home">Home</option>
          <option value="office">Office</option>
        </select>
        <input
          type="radio"
          name="priority"
          value={"low"}
          onChange={handleChange}
        />
        Low
        <input
          type="radio"
          name="priority"
          value={"medium"}
          onChange={handleChange}
        />
        Medium
        <input
          type="radio"
          name="priority"
          value={"high"}
          onChange={handleChange}
        />
        High
        <Button>submit</Button>
      </form>
    </div>
  );
};

export default Task;
