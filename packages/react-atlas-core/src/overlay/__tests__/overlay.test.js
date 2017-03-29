import React from "react";
import { mount } from "enzyme";
import { OverlayCore } from "../../index";
import sinon from "sinon";

describe("Testing Overlay component", () => {
  it("Check unmounting", function() {
    const willUnmount = sinon.spy(OverlayCore.prototype, "componentWillUnmount");
    const result = mount(<OverlayCore />);
    result.unmount();
    sinon.assert.calledOnce(willUnmount);
  });

  it("Check did update", function() {
    const didUpdate = sinon.spy(OverlayCore.prototype, "componentDidUpdate");
    const result = mount(<OverlayCore />);
    result.update();
    sinon.assert.calledOnce(didUpdate);
  });
});
