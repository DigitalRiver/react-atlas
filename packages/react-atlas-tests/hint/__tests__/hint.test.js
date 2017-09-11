import React from "react";
import { mount } from "enzyme";
import { default as Hint } from "../../../react-atlas-core/src/Hint/Hint";

describe("Test Hint component", () => {
  it("Test default props", function() {
    const result = mount(<Hint />);
  });
});
