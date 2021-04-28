import React from "react";
import { LoadingView } from "./components/LoadingView";
import { Link } from "react-router-dom";
import { useLoading } from "./useLoading";
import { ErrorView } from "./components/ErrorView";

export function ListUserPage({ userApi, loadProfile, msg, h5 }) {
  const { data: users, error, loading, reload } = useLoading(
    async () => await userApi.listUsers()
  );

  const { data } = useLoading(async () => await loadProfile());

  if (error) return <ErrorView error={error} reload={reload} />;
  if (loading || !users) return <LoadingView />;

  /* If login add link */
  function output(data, firstName, id, lastName, email, password) {
    if (data)
      return (
        <Link to={`/users/${id}/edit`}>
          User {id}: {firstName} {lastName}
        </Link>
      );
    else return `User ${id}: ${firstName} ${lastName}`;
  }

  return (
    <div>
      <h5>{h5}</h5>
      {users.map(({ id, firstName, lastName }) => (
        <li key={id}>{output(data, firstName, id, lastName)}</li>
      ))}
      <p>{msg}</p>
    </div>
  );
}
