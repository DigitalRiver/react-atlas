import React from "react";
import { mount } from "enzyme";
import { default as Switch } from "../../../react-atlas-core/src/Switch/Switch";

describe("Testing switch component", () => {
  it("Check default props", function() {
    const result = mount(<Switch onColor="black" />);
  });
});
