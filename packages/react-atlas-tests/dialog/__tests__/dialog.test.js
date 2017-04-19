import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import { DialogCore } from "react-atlas-core";

let count = 0;

function handleToggle() {
  count++;
}

describe("Test dialog component", () => {
  it("Test default props", function() {
    const result = mount(<DialogCore />);
    expect(result.props().active).to.equal(false);
    expect(result.props().type).to.equal("normal");
  });

  it("Check overlay click event", function() {
    const result = shallow(<DialogCore onOverlayClick={handleToggle} />);
    result.simulate("click");
    expect(count).to.equal(1);
  });
});
