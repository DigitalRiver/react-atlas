import React from "react";
import { mount } from "enzyme";
import { TextAreaCore } from "../../../react-atlas-core/src/TextArea/index";

describe("Testing TextArea component", () => {

	it("TextArea component - Basic test", function() {});

	it("TextArea component - regression test for bug #368", function() {
		const comp = mount(<TextAreaCore value={"cat"}/>);
    /* Make sure display text equals value prop. */
		expect(comp.text()).toBe('cat');
	});
});
