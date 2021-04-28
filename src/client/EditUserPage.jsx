import React, { useState } from "react";
import { LoadingView } from "./components/LoadingView";
import { InputField } from "./components/InputField";
import { useLoading } from "./useLoading";
import { ErrorView } from "./components/ErrorView";
import { useHistory, useParams } from "react-router";

function EditUserForm({ user, onSubmit }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const history = useHistory();

  async function submit(e) {
    onSubmit(e, { firstName, lastName, email, password });
    history.push("/users");
  }

  return (
    <form onSubmit={submit}>
      <h1>Edit existing user ({firstName})</h1>
      <InputField
        label={"First Name"}
        value={firstName}
        onChangeValue={setFirstName}
      />
      <InputField
        label={"Last Name"}
        value={lastName}
        onChangeValue={setLastName}
      />
      <InputField label={"email"} value={email} onChangeValue={setEmail} />
      <InputField
        type={"password"}
        label={"Password"}
        value={password}
        onChangeValue={setPassword}
      />
      <button>Submit</button>
    </form>
  );
}

export function EditUserPage({ userApi }) {
  const { id } = useParams();

  const { loading, error, data: user, reload } = useLoading(
    async () => await userApi.getUser(id),
    [id]
  );

  async function handleSubmit(e, { firstName, lastName, email, password }) {
    e.preventDefault();
    await userApi.updateUser(id, { firstName, lastName, email, password });
  }

  if (error) return <ErrorView error={error} reload={reload} />;
  if (loading || !user) return <LoadingView />;

  return <EditUserForm user={user} onSubmit={handleSubmit} />;
}
