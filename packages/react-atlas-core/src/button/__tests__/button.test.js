import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import Button from "../../button";

describe("Test button component", () => {
  it("Test default props", function() {
    const result = mount(<Button />);
    expect(result.props().children).to.equal("Default Button");
    expect(result.props().outline).to.equal(false);
    expect(result.props().loading).to.equal(false);
    expect(result.props().mini).to.equal(false);
  });

  it("Make sure main style is set correctly.", function() {
    let result = mount(<Button />);
    expect(result.props().primary).to.equal(false);

    result = mount(<Button primary />);
    expect(result.props().primary).to.equal(true);

    result = mount(<Button secondary />);
    expect(result.props().secondary).to.equal(true);

    result = mount(<Button success />);
    expect(result.props().success).to.equal(true);

    result = mount(<Button warning />);
    expect(result.props().warning).to.equal(true);

    result = mount(<Button danger />);
    expect(result.props().danger).to.equal(true);

    result = mount(<Button link />);
    expect(result.props().link).to.equal(true);
  });

  it("Make sure role is set to button when element is <a>", function() {
    const result = mount(<Button href={"#"} />);
    expect(result.first().props("style").style.role).to.equal("button");
  });
});
