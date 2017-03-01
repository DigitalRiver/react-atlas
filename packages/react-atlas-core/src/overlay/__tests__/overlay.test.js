import React from "react";
import { mount } from "enzyme";
import Overlay from "../../overlay";
import sinon from "sinon";

describe("Testing Overlay component", () => {
  it("Check unmounting", function() {
    const willUnmount = sinon.spy(Overlay.prototype, "componentWillUnmount");
    const result = mount(<Overlay />);
    result.unmount();
    sinon.assert.calledOnce(willUnmount);
  });

  it("Check did update", function() {
    const didUpdate = sinon.spy(Overlay.prototype, "componentDidUpdate");
    const result = mount(<Overlay />);
    result.update();
    sinon.assert.calledOnce(didUpdate);
  });
});
