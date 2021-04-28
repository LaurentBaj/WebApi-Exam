import React, { useEffect, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";

import { ProfilePage } from "./ProfilePage";
import { fetchJSON, fetchJson, postJSON } from "./lib/http";
import { LoginPage } from "./LoginPage";
import { LoginCallbackPage } from "./LoginCallbackPage";
import { ListUserPage } from "./ListUserPage";
import { EditUserPage } from "./EditUserPage";
import { CreateUserPage } from "./CreateUserPage";
import { MemberLoginPage } from "./MemberLoginPage";

function useLocalStorage(key) {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key))
  );

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }, [value]);
  return [value, setValue];
}

export function App() {
  const userApi = {
    listUsers: async () => await fetchJSON("/api/users"),
    getUser: async (id) => await fetchJSON(`/api/users/${id}`),
    createUser: async ({ firstName, lastName, email, password }) => {
      return postJSON("/api/users", {
        json: { firstName, lastName, email, password },
        method: "POST",
      });
    },
    updateUser: async (id, { firstName, lastName, email, password }) =>
      postJSON(`/api/users/${id}`, {
        json: { firstName, lastName, email, password },
        method: "PUT",
      }),
  };

  const [access_token, setAccess_token] = useLocalStorage("access_token");

  const googleIdentityProvider = {
    discoveryURL:
      "https://accounts.google.com/.well-known/openid-configuration",
    client_id:
      "243023781863-mtmgurofsoc7hv9av9q53onkg5lo4dh6.apps.googleusercontent.com",
    scope: "openid email profile",
  };

  async function loadProfile() {
    return fetchJson("/api/profile", {
      headers: {
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      },
    });
  }

  return (
    <div id={"container"}>
      <BrowserRouter>
        {/*Front page - Components*/}
        <header>
          <Link className={"link"} to={"/profile"}>
            Profile
          </Link>
          <Link className={"link"} to={"/login"}>
            Admin
          </Link>
          <Link className={"link"} to={"/"}>
            Front Page
          </Link>
          <Link className={"link"} to={"/member"}>
            Login
          </Link>
        </header>
        <main>
          <Switch>
            <Route exact path={"/"} id={"container"}>
              <h1>CoronaBook</h1>
              <ListUserPage userApi={userApi} h5={"Current Members"} />
            </Route>

            {/*Login - Components*/}
            <Route path={"/profile"}>
              <ProfilePage loadProfile={loadProfile} />
            </Route>
            <Route exact path={"/login"}>
              <LoginPage identityProvider={googleIdentityProvider} />
            </Route>
            <Route path={"/login/callback"}>
              <LoginCallbackPage
                identityProvider={googleIdentityProvider}
                onAccessToken={(access_token) => setAccess_token(access_token)}
              />
            </Route>

            {/*Cantine - Components*/}
            <Route path={"/create"}>
              <CreateUserPage userApi={userApi} />
            </Route>
            <Route exact path={"/users"}>
              <ListUserPage
                loadProfile={loadProfile}
                userApi={userApi}
                msg={"Click on the users to edit them"}
                h5={"Edit Page"}
              />
            </Route>
            <Route path={"/users/:id/edit"}>
              <EditUserPage userApi={userApi} />
            </Route>
            <Route path="/member">
              <MemberLoginPage userApi={userApi} />
            </Route>
            <Route>
              <h1>Page not found</h1>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}
