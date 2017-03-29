import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import { ButtonCore } from "../../index";

describe("Test ButtonCore component", () => {
  it("Test default props", function() {
    const result = mount(<ButtonCore />);
    expect(result.props().children).to.equal("Default Button");
    expect(result.props().outline).to.equal(false);
    expect(result.props().loading).to.equal(false);
    expect(result.props().mini).to.equal(false);
  });

  it("Make sure main style is set correctly.", function() {
    let result = mount(<ButtonCore />);
    expect(result.props().primary).to.equal(false);

    result = mount(<ButtonCore primary />);
    expect(result.props().primary).to.equal(true);

    result = mount(<ButtonCore secondary />);
    expect(result.props().secondary).to.equal(true);

    result = mount(<ButtonCore success />);
    expect(result.props().success).to.equal(true);

    result = mount(<ButtonCore warning />);
    expect(result.props().warning).to.equal(true);

    result = mount(<ButtonCore danger />);
    expect(result.props().danger).to.equal(true);

    result = mount(<ButtonCore link />);
    expect(result.props().link).to.equal(true);
  });
});
