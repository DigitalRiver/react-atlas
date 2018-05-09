import React from "react";
import { HintCore } from "../../../react-atlas-core/src/Hint/index";
import renderer from "react-test-renderer";

describe("Test Hint component render", () => {
  it("Render correctly", () => {
    const tree = renderer.create(<HintCore text="Some text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
