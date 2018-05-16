import React from "react";
import { mount } from "enzyme";
import { Panel } from "../index";
import renderer from "react-test-renderer";

describe("Test correct render", () => {
  it("Test correct render", function() {
    const tree = renderer.create(<Panel>Panel Text</Panel>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test panel - Basic tests", () => {
  it("Test panel - basic test I", function() {
    const panel = mount(<Panel>Panel Text</Panel>);
  });

  it("Test panel - basic test II", function() {
    const panel = mount(<Panel children={"Panel Text"} />);
  });
});
