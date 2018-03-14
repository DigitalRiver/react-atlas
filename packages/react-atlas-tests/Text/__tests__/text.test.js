import React from "react";
import { mount } from "enzyme";
import { TextCore } from "../../../react-atlas-core/src/Text/index";
import renderer from "react-test-renderer";

describe("Test Text component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<TextCore>Hello World!</TextCore>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
