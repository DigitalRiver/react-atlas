import React from "react";
import { mount } from "enzyme";
import { PanelCore } from "../../../react-atlas-core/src/Panel/index";

import renderer from "react-test-renderer";

describe("Test correct render", () => {
  it("Test correct render", function() {
    const tree = renderer.create(<PanelCore>Panel Text</PanelCore>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test panel - Basic tests", () => {
  it("Test panel - basic test I", function() {
    const panel = mount(<PanelCore>Panel Text</PanelCore>);
  });

  it("Test panel - basic test II", function() {
    const panel = mount(<PanelCore children={"Panel Text"} />);
  });
});
