import React, { useState } from "react";
import { InputField } from "./components/InputField";
import { ChatPage } from "./ChatPage";

function MemberProfile({ member }) {
  return (
    <div>
      <h3>Logged in as ({member.firstName})</h3>
      <ChatPage member={member} />
    </div>
  );
}

export function MemberLoginPage({ userApi }) {
  const [firstName, setFirstName] = useState();
  const [password, setPassword] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [member, setMember] = useState("Guest");

  async function submit(e) {
    e.preventDefault();
    const users = await userApi.listUsers();
    const user = users.find((e) => e.firstName === firstName);
    if (firstName === user.firstName && password === user.password) {
      setIsLoggedIn(true);
      setMember(user);
    }
  }

  return (
    <>
      {isLoggedIn && <MemberProfile member={member} />}
      {!isLoggedIn && (
        <form onSubmit={submit}>
          <h1>Login as user</h1>
          <InputField
            label={"Surname"}
            onChangeValue={setFirstName}
            value={firstName}
          />
          <InputField
            label={"Password"}
            onChangeValue={setPassword}
            value={password}
            type={"password"}
          />
          <button>Submit</button>
        </form>
      )}
    </>
  );
}
