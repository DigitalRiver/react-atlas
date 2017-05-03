import React from "react";
import { mount } from "enzyme";
import { ButtonCore } from "react-atlas-core";

describe("Test ButtonCore component", () => {
  it("Test default props", function() {
    const result = mount(<ButtonCore />);
    expect(result.props().children).toBe("Default Button");
    expect(result.props().outline).toBe(false);
    expect(result.props().loading).toBe(false);
    expect(result.props().mini).toBe(false);
  });

  it("Make sure main style is set correctly.", function() {
    let result = mount(<ButtonCore />);
    expect(result.props().primary).toBe(false);

    result = mount(<ButtonCore primary />);
    expect(result.props().primary).toBe(true);

    result = mount(<ButtonCore secondary />);
    expect(result.props().secondary).toBe(true);

    result = mount(<ButtonCore success />);
    expect(result.props().success).toBe(true);

    result = mount(<ButtonCore warning />);
    expect(result.props().warning).toBe(true);

    result = mount(<ButtonCore danger />);
    expect(result.props().danger).toBe(true);

    result = mount(<ButtonCore link />);
    expect(result.props().link).toBe(true);
  });
});
