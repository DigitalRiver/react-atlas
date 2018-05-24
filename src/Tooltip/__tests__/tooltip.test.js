import React from "react";
import { mount } from "enzyme";
import { Tooltip } from "../index";

import { verifyPropsDefaultValue } from "../../utils/propsVerification";

import renderer from "react-test-renderer";

describe("Test Tooltip component render", () => {
  it("Render correctly", () => {
    const tree = renderer
      .create(
        <Tooltip
          tooltip={"Hey I'm a tooltip"}
          position={"top"}
          icon={"<i class='fa fa-github'></i>"}
          tooltipDelay={3000}
          active={false}
          className={"class"}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing Tooltip component", () => {
  it("Tooltip component - Properties basic test", function() {
    const comp = mount(
      <Tooltip
        tooltip={"Hey I'm a tooltip"}
        position={"top"}
        icon={"<i class='fa fa-github'></i>"}
        tooltipDelay={3000}
        active={false}
        className={"class"}
      />
    );
    const expectedProps = new Map([
      ["tooltip", "Hey I'm a tooltip"],
      ["position", "top"],
      ["tooltipDelay", 3000],
      ["active", false],
      ["className", "class"]
    ]);

    expect(verifyPropsDefaultValue(comp, expectedProps)).toEqual(true);
  });

  it("Tooltip component - Mouse in with delays", function() {
    const comp = mount(<Tooltip tooltip={"Hey I'm a tooltip"} delay={1000} />);
    jest.useFakeTimers();
    expect(comp.state().active).toEqual(false);
    comp.simulate("mouseEnter");
    jest.runAllTimers();
    expect(comp.state().active).toEqual(true);
  });

  it("Tooltip component - Mouse in without delays", function() {
    const comp = mount(<Tooltip tooltip={"Hey I'm a tooltip"} />);
    jest.useFakeTimers();
    expect(comp.state().active).toEqual(false);
    comp.simulate("mouseEnter");
    jest.runAllTimers();
    expect(comp.state().active).toEqual(true);
  });

  it("Tooltip component - Mouse in/out", function() {
    const comp = mount(<Tooltip tooltip={"Hey I'm a tooltip"} />);

    comp.simulate("mouseEnter");
    expect(comp.state().active).toEqual(true);

    comp.simulate("mouseLeave");
    expect(comp.state().active).toEqual(false);
  });
});
