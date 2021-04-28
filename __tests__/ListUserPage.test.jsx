import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import {describe, it} from "@jest/globals";
import {ListUserPage} from "../src/client/ListUserPage";

describe("user list page", () => {
  it("show user on dom", async () => {
    const userApi = {
      listUsers: () => [
          { id: 1, firstName: "Laurent", lastName: "Bajrami", email: "laurent@hotmail.com", password: "1234"}],
    };

    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <ListUserPage userApi={userApi} />
        </MemoryRouter>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("li").textContent).toEqual(
      "User 1: Laurent Bajrami"
    );
  });
});
