import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import { GridRowCore } from "../../index";

const gutter = 2;

describe("Testing gridrow component", () => {
  it("Set props should match what was passed in", function() {
    const result = mount(<GridRowCore gutter={gutter} />);
    expect(result.props().gutter).to.equal(gutter);
  });
  it("Make sure a div is returned", function() {
    const result = shallow(<GridRowCore />);
    expect(result.type()).to.equal("div");
  });
  it("Check CSS styling", function() {
    const result = mount(<GridRowCore gutter={gutter} />);
    expect(result.find("div").first().props("style").style.marginLeft).to.equal(
      gutter / -2
    );
    expect(
      result.find("div").first().props("style").style.marginRight
    ).to.equal(gutter / -2);
    expect(result.find("div").first().props("style").style.display).to.equal(
      "flex"
    );
    expect(result.find("div").first().props("style").style.flexWrap).to.equal(
      "wrap"
    );
    expect(result.find("div").first().props("style").style.msFlexWrap).to.equal(
      "wrap"
    );
    expect(
      result.find("div").first().props("style").style.WebkitFlexWrap
    ).to.equal("wrap");
  });
});
