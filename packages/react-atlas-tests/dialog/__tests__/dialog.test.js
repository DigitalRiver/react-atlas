import React from "react";
import { mount, shallow } from "enzyme";
import { DialogCore } from "react-atlas-core";

let count = 0;

function handleToggle() {
  count++;
}

describe("Test dialog component", () => {
  it("Test default props", function() {
    const result = mount(<DialogCore />);
    expect(result.props().active).toBe(false);
    expect(result.props().type).toBe("normal");
  });

  it("Check overlay click event", function() {
    const result = shallow(<DialogCore onOverlayClick={handleToggle} />);
    result.simulate("click");
    expect(count).toBe(1);
  });
});
