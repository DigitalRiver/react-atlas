import React from "react";
import { mount } from "enzyme";
import Radio from "../../radio";

describe("Testing radio component", () => {
  it("Set props should match what was passed in", function() {
    const result = mount(<Radio label="Checked Radio" value="checkedRadio" />);
    // expect(result.props().aspectRatio).to.equal(aspectRatio);
  });
});
