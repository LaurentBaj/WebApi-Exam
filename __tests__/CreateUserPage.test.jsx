import React from "react";
import ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import { CreateUserPage } from "../src/client/CreateUserPage";
import {describe, it, jest} from "@jest/globals";


function testFindInput(form, label) {
    return form
        .findAllByType("label")
        .find((p) => p.props.children.join("").startsWith(label))
        .findByType("input");
}

function testChangeValue(input, value) {
    TestRenderer.act(() => {
        input.props.onChange({ target: { value } });
    });
}

describe("create user view", () => {
    it("test renders view", async () => {
        const createUser = jest.fn();
        let view;
        await TestRenderer.act(async () => {
            view = TestRenderer.create(
                <MemoryRouter>
                    <CreateUserPage userApi={{ createUser: createUser }} />
                </MemoryRouter>
            );
        });
        expect(view.toJSON()).toMatchSnapshot();
        const form = view.root.findByType("form");
        testChangeValue(testFindInput(form, "First Name"), "Laurent");
        testChangeValue(testFindInput(form, "Last Name"), "Bajrami");
        testChangeValue(testFindInput(form, "Email"), "Laurent@hotmail.com");
        testChangeValue(testFindInput(form, "Password"), "1234");
        form.props.onSubmit({ preventDefault() {} });
        expect(createUser).toBeCalledWith({
            firstName: "Laurent",
            lastName: "Bajrami",
            email: "Laurent@hotmail.com",
            password: "1234",
        });
    });

});