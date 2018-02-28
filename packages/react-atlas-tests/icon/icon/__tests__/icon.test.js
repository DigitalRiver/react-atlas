import React from "react";
import { mount, shallow } from "enzyme";
import { IconCore } from "../../../../react-atlas-core/src/Icon/index";

import renderer from 'react-test-renderer';

let icon = 'icon={<i className="fa fa-github"></i>}';

describe("Test correct render", () => {
  it("Test correct render", function() {
	const tree = renderer.create(<IconCore icon={icon} />).toJSON();
	expect(tree).toMatchSnapshot(); 
  });
});

describe("Testing Icon component", () => {
  it("Set props should match what was passed in", function() {
    const result = mount(
      <IconCore icon={icon} />
    );
    expect(result.props().icon).toBe(icon);
  });

});
