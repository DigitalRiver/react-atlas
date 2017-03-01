import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import Dialog from "../../dialog";

let count = 0;

function handleToggle() {
  count++;
}

describe("Test dialog component", () => {
  it("Test default props", function() {
    const result = mount(<Dialog />);
    expect(result.props().active).to.equal(false);
    expect(result.props().type).to.equal("normal");
    expect(result.props().className).to.equal("");
    expect(result.props().theme).to.contain({ "inactive": true });
  });

  it("Check overlay click event", function() {
    const result = shallow(<Dialog onOverlayClick={handleToggle} />);
    result.simulate("click");
    expect(count).to.equal(1);
  });
});
