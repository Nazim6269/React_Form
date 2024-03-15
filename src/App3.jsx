import React from "react";
import useForm from "./hooks/useForm";

const App3 = () => {
  const { formState } = useForm({
    init: {
      name: "nazim",
      email: "",
      password: "",
    },
  });
  console.log(formState);
  return <div>App3</div>;
};

export default App3;
