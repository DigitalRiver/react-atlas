import React from "react";
import { mount, shallow } from "enzyme";
import { GridRowCore } from "react-atlas-core";

const gutter = 2;

describe("Testing gridrow component", () => {
  it("Set props should match what was passed in", function() {
    const result = mount(<GridRowCore gutter={gutter} />);
    expect(result.props().gutter).toBe(gutter);
  });
  it("Make sure a div is returned", function() {
    const result = shallow(<GridRowCore />);
    expect(result.type()).toBe("div");
  });
  it("Check CSS styling", function() {
    const result = mount(<GridRowCore gutter={gutter} />);
    expect(result.find("div").first().props("style").style.marginLeft).toBe(
      gutter / -2
    );
    expect(
      result.find("div").first().props("style").style.marginRight
    ).toBe(gutter / -2);
    expect(result.find("div").first().props("style").style.display).toBe(
      "flex"
    );
    expect(result.find("div").first().props("style").style.flexWrap).toBe(
      "wrap"
    );
    expect(result.find("div").first().props("style").style.msFlexWrap).toBe(
      "wrap"
    );
    expect(
      result.find("div").first().props("style").style.WebkitFlexWrap
    ).toBe("wrap");
  });
});
