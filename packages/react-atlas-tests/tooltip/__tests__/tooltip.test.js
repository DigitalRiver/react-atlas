import React from "react";
import { mount } from "enzyme";
import { TooltipCore } from "react-atlas-core";

const message = "The tooltip message";
const inline = false;
const delay = 10;
const hide = true;
const position = "top";

describe("Testing tooltip component", () => {
  it("Set props should match what was passed in", function() {
    const result = mount(
      <TooltipCore
        tooltip={message}
        inline={inline}
        tooltipDelay={delay}
        tooltipHideOnClick={hide}
        position={position}
      />
    );
    expect(result.props().tooltip).toBe(message);
    expect(result.props().inline).toBe(inline);
    expect(result.props().tooltipDelay).toBe(delay);
    expect(result.props().tooltipHideOnClick).toBe(hide);
    expect(result.props().position).toBe(position);
  });
});
