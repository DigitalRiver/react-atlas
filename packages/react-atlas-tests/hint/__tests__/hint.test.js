import React from "react";
import { mount } from "enzyme";
import { HintCore } from "../../../react-atlas-core/src/Hint/index";

import renderer from "react-test-renderer";

describe("Test Hint component render", () => {
  it("Render correctly", () => {
    const tree = renderer.create(<HintCore text="Some text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test Hint component", () => {
  it("Test default props", function() {
    const result = mount(<HintCore text="Some text" />);
  });

  it("Test default props", function() {
    const result = mount(<HintCore>"Some text"</HintCore>);
  });
});
