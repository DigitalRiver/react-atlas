import React from "react";
import { mount } from "enzyme";
import { InputCore } from "react-atlas-core";

describe("Testing Input component", () => {
  it("Check default props", function() {
    const result = mount(<InputCore />);
    expect(result.props().disabled).toBe(false);
    expect(result.props().type).toBe("text");
    expect(result.props().inputLength).toBe(0);
    expect(result.props().focus).toBe(false);
  });

  it("Check props passed into the Input component", function() {
    const result = mount(<InputCore disabled />);
    expect(result.props().disabled).toBe(true);
  });

  it("Make sure inputted text is shorter than max length", function() {
    const result = mount(<InputCore maxLength={10} />);
    result
      .find("input")
      .simulate("change", { "target": { "value": "1234567890!!!" } });
    expect(result.state().value).toBe("1234567890");
  });

  it("Make sure inputted text is set when shorter than max length", function() {
    const result = mount(<InputCore maxLength={10} />);
    result.find("input").simulate("change", { "target": { "value": "123456789" } });
    expect(result.state().value).toBe("123456789");
  });
});
