import React from "react";
import { mount } from "enzyme";
import { CardCore } from "react-atlas-core";

describe("Test Card component", () => {
  it("Test default props", function() {
    const result = mount(<CardCore />);

    /* Make sure card returns the correct default text.  */
    expect(result.props().children).toBe(<p>Some card text.</p>);

    /* Check theme object. */
    expect(result.props().theme).toContain({ "card": true });
  });
});
