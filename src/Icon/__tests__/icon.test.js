import React from "react";
import { mount } from "enzyme";
import { Icon } from "../index";

import renderer from "react-test-renderer";

let icon = 'icon={<i className="fa fa-github"></i>}';

describe("Test correct render", () => {
  it("Test correct render", function() {
    const tree = renderer.create(<Icon icon={icon} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing Icon component", () => {
  it("Set props should match what was passed in", function() {
    const result = mount(<Icon icon={icon} />);
    expect(result.props().icon).toBe(icon);
  });

  it("Should warn when no icon prop is passed", function() {
    global.console = { warn: jest.fn() }; //eslint-disable-line
    mount(<Icon />);
    expect(console.warn).toBeCalled();
  });
});
