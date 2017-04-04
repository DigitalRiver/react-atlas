import React from "react";
import { mount } from "enzyme";
import { HeaderCore } from "../../index";

describe("Test Header component", () => {
  it("Test default props", function() {
    const result = mount(<HeaderCore />);
  });
});
