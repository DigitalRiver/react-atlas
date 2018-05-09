import React from "react";
import { PanelCore } from "../../../react-atlas-core/src/Panel/index";

import renderer from "react-test-renderer";

describe("Test correct render", () => {
  it("Test correct render", function() {
    const tree = renderer.create(<PanelCore>Panel Text</PanelCore>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
