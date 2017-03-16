import React from "react";
import { mount } from "enzyme";
import { SwitchCore } from "../../index";

describe("Testing switch component", () => {
  it("Check default props", function() {
    const result = mount(<SwitchCore onColor="black" />);
  });
});
