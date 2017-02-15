import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import Tooltip from "../../tooltip";

const message = "The tooltip message";
const inline = false;
const delay = 10;
const hide = true;
const position = "top";

describe("Testing tooltip component", () => {
  it("Set props should match what was passed in", function() {
    const result = mount(
      <Tooltip
        tooltip={message}
        inline={inline}
        tooltipDelay={delay}
        tooltipHideOnClick={hide}
        position={position}
      />
    );
    expect(result.props().tooltip).to.equal(message);
    expect(result.props().inline).to.equal(inline);
    expect(result.props().tooltipDelay).to.equal(delay);
    expect(result.props().tooltipHideOnClick).to.equal(hide);
    expect(result.props().position).to.equal(position);
  });
});
