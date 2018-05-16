import React from "react";
import { mount } from "enzyme";
import { Text } from "../index";
import renderer from "react-test-renderer";

describe("Test Text component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Text>Hello World!</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
