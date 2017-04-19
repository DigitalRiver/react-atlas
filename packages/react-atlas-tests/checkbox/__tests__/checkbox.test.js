import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import { CheckboxCore } from "react-atlas-core";

describe("Test checkbox component", () => {
  it("Test default props", function() {
    const result = mount(<CheckboxCore />);
    expect(result.props().className).to.equal("");
    expect(result.props().disabled).to.equal(false);
    expect(result.props().inline).to.equal(false);
  });

  it("Make sure label is used as title when title is not set", function() {
    const result = mount(<CheckboxCore label={"labelText"} />);
    expect(result.text()).to.contain("labelText");
  });
});
