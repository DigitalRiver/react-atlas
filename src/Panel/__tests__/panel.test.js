import React from "react";
import Panel from "../index";

import renderer from "react-test-renderer";

describe("Test correct render", () => {
  it("Test correct render", function() {
    const tree = renderer.create(<Panel>Panel Text</Panel>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
