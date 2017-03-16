import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import { InputCore } from "../../input";

describe("Testing Input component", () => {
  it("Check default props", function() {
    const result = mount(<InputCore />);
    expect(result.props().disabled).to.equal(false);
    expect(result.props().type).to.equal("text");
    expect(result.props().inputLength).to.equal(0);
    expect(result.props().focus).to.equal(false);
  });

  it("Check props passed into the Input component", function() {
    const result = mount(<InputCore disabled />);
    expect(result.props().disabled).to.equal(true);
  });

  it("Make sure inputted text is shorter than max length", function() {
    const result = mount(<InputCore maxLength={10} />);
    result
      .find("input")
      .simulate("change", { "target": { "value": "1234567890!!!" } });
    expect(result.state().value).to.equal("1234567890");
  });

  it("Make sure inputted text is set when shorter than max length", function() {
    const result = mount(<InputCore maxLength={10} />);
    result.find("input").simulate("change", { "target": { "value": "123456789" } });
    expect(result.state().value).to.equal("123456789");
  });
});
