import React from "react";
import { useLoading } from "./lib/useLoading";
import { Link } from "react-router-dom";
import { Route } from "react-router";

export function ProfilePage({ loadProfile }) {
  const { loading, error, data } = useLoading(async () => await loadProfile());

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <pre>You are not logget in. Go to profile page to use Google Login</pre>
        <Link to={"/login"}>
          <button>Google Login</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Profile</h1>
      <div class={"profile"}>{data.name}</div>
      {data.picture && (
        <div class={"profile"}>
          <img src={data.picture} />
        </div>
      )}
      <div id={"addDish"}>{data && <Link to={"/create"}>Add user</Link>}</div>
      <div>{data && <Link to={"/users"}>Edit user</Link>}</div>
    </div>
  );
}
