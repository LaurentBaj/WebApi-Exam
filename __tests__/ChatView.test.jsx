import * as ReactDOM from "react-dom";
import * as React from "react";

import { ChatView } from "../src/client/ChatView";
import { Simulate } from "react-dom/test-utils";
import {describe, it} from "@jest/globals";


const member = {
    firstName: "Laurent",
    password: "1234"
}

describe("chat view", () => {
    it("submits a new chat message", () => {
        const container = document.createElement("div");
        const onSendMessage = jest.fn();
        ReactDOM.render(
            <ChatView chatLog={[]} onSendMessage={onSendMessage} member={member} />,
            container
        );

        Simulate.change(container.querySelector("input"), {
            target: { value: "Hello World" },
        });
        Simulate.submit(container.querySelector("form"));

        expect(onSendMessage).toBeCalledWith("Hello World");
    });
});