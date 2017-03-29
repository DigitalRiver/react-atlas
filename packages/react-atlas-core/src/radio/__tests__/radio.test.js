import React from "react";
import { mount } from "enzyme";
import { RadioCore } from "../../index";

describe("Testing radio component", () => {
  it("Set props should match what was passed in", function() {
    const result = mount(<RadioCore label="Checked Radio" value="checkedRadio" />);
    // expect(result.props().aspectRatio).to.equal(aspectRatio);
  });
});
