import React from "react";
import { mount } from "enzyme";
import { Hint } from "../index";

import renderer from "react-test-renderer";

describe("Test Hint component render", () => {
  it("Render correctly", () => {
    const tree = renderer.create(<Hint text="Some text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test Hint component", () => {
  it("Test default props", function() {
    const result = mount(<Hint text="Some text" />);
  });

  it("Test default props", function() {
    const result = mount(<Hint>"Some text"</Hint>);
  });
});
