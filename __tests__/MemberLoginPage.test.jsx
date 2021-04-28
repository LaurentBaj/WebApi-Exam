import React from "react"
import {describe, it} from "@jest/globals";
import * as ReactDOM from "react-dom";
import {MemoryRouter} from "react-router-dom";
import {MemberLoginPage} from "../src/client/MemberLoginPage";


const member = {firstName: "Laurent", password:"1234"}

describe("MemberLoginPage", () => {
    it("render page", async () => {
        const container = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <MemberLoginPage userApi={member}/>
            </MemoryRouter>,
            container
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h1").textContent).toEqual(
            "Login as user"
        );
        expect(container.querySelector("label").textContent).toEqual(
            "Surname: "
        );
    });
})

