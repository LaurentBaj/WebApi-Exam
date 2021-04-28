import { App } from "../src/client/App";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "@jest/globals";

describe("app", () => {
    it("can show home page", async () => {
        const container = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
            container
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h1").textContent).toEqual(
            "CoronaBook"
        );
    });


    it("can navigate to profile page", async () => {
        const container = document.createElement("div");
        await act(async () => {
            await ReactDOM.render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>,
                container
            );
        });
        const createChatLink = [...container.querySelectorAll("a")].find(
            (a) => a.textContent === "Profile"
        );
        await act(async () => {
            await createChatLink.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div a").textContent).toEqual(
            "Profile"
        );
    });


it("can navigate to admin login page", async () => {
    const container = document.createElement("div");
    await act(async () => {
        await ReactDOM.render(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
            container
        );
    });
    const createLoginLink = [...container.querySelectorAll("a")].find(
        (a) => a.textContent === "Admin"
    );
    await act(async () => {
        await createLoginLink.dispatchEvent(
            new MouseEvent("click", { bubbles: true })
        );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h2").textContent).toEqual("Login as admin");
});


    it("can navigate to member page", async () => {
        const container = document.createElement("div");
        await act(async () => {
            await ReactDOM.render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>,
                container
            );
        });
        const createChatLink = [...container.querySelectorAll("a")].find(
            (a) => a.textContent === "Login"
        );
        await act(async () => {
            await createChatLink.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div a").textContent).toEqual(
            "Profile");
    });

});