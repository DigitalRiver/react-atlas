import React from "react";
import { mount } from "enzyme";
import { DrawerCore } from "react-atlas-core";

describe("Test Drawer component", () => {
  it("Test default props", function() {
    const result = mount(<DrawerCore />);
    expect(result.props().active).toBe(false);
    expect(result.props().className).toBe("");
    expect(result.props().type).toBe("left");
  });
});
