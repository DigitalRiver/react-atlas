import React from "react";
import { mount } from "enzyme";
import { CheckboxCore } from "react-atlas-core";

describe("Test checkbox component", () => {
  it("Test default props", function() {
    const result = mount(<CheckboxCore />);
    expect(result.props().className).toBe("");
    expect(result.props().disabled).toBe(false);
    expect(result.props().inline).toBe(false);
  });

  it("Make sure label is used as title when title is not set", function() {
    const result = mount(<CheckboxCore label={"labelText"} />);
    expect(result.text()).toContain("labelText");
  });
});
