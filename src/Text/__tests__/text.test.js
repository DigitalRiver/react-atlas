import React from "react";
import { mount } from "enzyme";
import Text from "../index";
import renderer from "react-test-renderer";

describe("Test Text component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Text>Hello World!</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Text component - Body Text", function() {
    const comp = mount(<Text body>Body Text</Text>);
    expect(comp.props().body).toBe(true);
    expect(comp.props().as).toEqual("span");
  });
});
