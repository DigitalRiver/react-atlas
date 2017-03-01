import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import Card from "../../card";

describe("Test Card component", () => {
  it("Test default props", function() {
    const result = mount(<Card />);

    /* Make sure card returns the correct default text.  */
    expect(result.props().children).to.equal(<p>Some card text.</p>);

    /* Check theme object. */
    expect(result.props().theme).to.contain({ "card": true });
  });
});
