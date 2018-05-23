import React from "react";
import Hint from "../index";
import renderer from "react-test-renderer";

describe("Test Hint component render", () => {
  it("Render correctly", () => {
    const tree = renderer.create(<Hint text="Some text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
