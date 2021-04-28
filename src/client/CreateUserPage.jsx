import React, { useState } from "react";
import { InputField } from "./components/InputField";
import { useHistory } from "react-router";

export function CreateUserPage({ userApi }) {
  const [firstName, setFistName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function submit(e) {
    e.preventDefault();
    history.push("/");
    await userApi.createUser({ firstName, lastName, email, password });
  }

  return (
    <form onSubmit={submit}>
      <h1>Create new user</h1>
      <InputField
        label={"First Name"}
        value={firstName}
        onChangeValue={setFistName}
      />
      <InputField
        label={"Last Name"}
        value={lastName}
        onChangeValue={setLastName}
      />
      <InputField label={"Email"} value={email} onChangeValue={setEmail} />
      <InputField
        label={"Password"}
        value={password}
        onChangeValue={setPassword}
        type="password"
      />
      <button>Submit</button>
    </form>
  );
}
