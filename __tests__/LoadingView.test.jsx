import {LoadingView} from "../src/client/components/LoadingView";
import React from "react";
import ReactDOM from "react-dom";
import {act} from "react-dom/test-utils";
import {describe, it} from "@jest/globals";

describe("loading view", () => {
    it("show loading view on dom", () => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<LoadingView />, container);
        });

        expect(container.innerHTML).toMatchSnapshot();
    });
});