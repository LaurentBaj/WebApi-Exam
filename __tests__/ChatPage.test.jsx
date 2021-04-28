import * as React from "react";
import * as ReactDOM from "react-dom";
import {describe, it} from "@jest/globals";
import {ChatPage} from "../src/client/ChatPage";



describe("chat page", () => {
    it("render page", () => {
        const container = document.createElement("div");
        const onSendMessage = jest.fn();
        ReactDOM.render(
            <ChatPage  />,
            container
        );

        expect(container.innerHTML).toMatchSnapshot()
    });
});