import React from "react";
import { mount } from "enzyme";
import Switch from "../../switch";

describe("Testing switch component", () => {
  it("Check default props", function() {
    const result = mount(<Switch onColor="black" />);
  });
});
