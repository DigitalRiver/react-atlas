import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import A from "../../constants";
import { GridColCore } from "../../index";
import sinon from "sinon";

const basis = "20";

describe("Testing gridcol component", () => {
  it("Set props should match what was passed in", function() {
    const result = mount(<GridColCore gutter={2} sm={"1"} md={"1/2"} />);
    expect(result.props().gutter).to.equal(2);
    expect(result.props().sm).to.equal("1");
    expect(result.props().md).to.equal("1/2");
  });

  it("Make sure default props are set", function() {
    const result = mount(<GridColCore />);
    expect(result.props().gutter).to.equal(A.width.gutter);
  });

  it("Check unmount behaviour", function() {
    const willUnmount = sinon.spy(GridColCore.prototype, "componentWillUnmount");
    const result = mount(<GridColCore />);
    result.unmount();
    sinon.assert.calledOnce(willUnmount);
  });

  // it("Check widths", function() {
  //   const result = mount(<GridColCore basis={basis} />);
  //   expect(result.find("div").first().props("style").style.flex).to.equal(
  //     "1 0 " + basis
  //   );
  //   expect(result.find("div").first().props("style").style.msFlex).to.equal(
  //     "1 0 " + basis
  //   );
  //   expect(result.find("div").first().props("style").style.WebkitFlex).to.equal(
  //     "1 0 " + basis
  //   );
  //   expect(result.state().windowWidth).to.equal(window.innerWidth);
  // });

  it("Check handle resize", function() {
    const result = shallow(<GridColCore />);
    result.instance()._handleResize();
    expect(result.state().windowWidth).to.equal(window.innerWidth);
  });
});
