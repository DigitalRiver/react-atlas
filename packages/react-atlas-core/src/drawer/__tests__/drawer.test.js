import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import Drawer from "../../drawer";

describe("Test Drawer component", () => {
  it("Test default props", function() {
    const result = mount(<Drawer />);
    expect(result.props().active).to.equal(false);
    expect(result.props().className).to.equal("");
    expect(result.props().type).to.equal("left");
    expect(result.props().theme).to.contain({ "container": true });
  });
});
