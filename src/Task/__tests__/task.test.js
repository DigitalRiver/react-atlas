import React from "react";
import { mount } from "enzyme";
import { Task } from "../index";

import renderer from "react-test-renderer";

describe("Test correct render", () => {
  it("Test correct render", function() {
    const tree = renderer
      .create(<Task icon={"fa fa-id-card"} title="Item One" selected />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test Task component", () => {
  it("applies css classes supplied in className prop", function() {
    const task = mount(<Task className="myClass anotherClass" />);
    expect(task.props().className).toBe("myClass anotherClass");
    expect(task.find("span").html()).toContain("myClass anotherClass");
  });
  it("applies icon supplied in icon prop", function() {
    const task = mount(<Task icon="fa fa-github" />);
    expect(task.find("i").exists()).toBe(true);
    expect(task.find("i").html()).toContain("fa fa-github");
  });
  it("applies id prop", function() {
    const task = mount(<Task id="myId" />);
    expect(task.props().id).toBe("myId");
    expect(task.find("span").html()).toContain('id="myId');
  });
  it("applies onClick prop", function() {
    const clickHandler = jest.fn();
    const task = mount(<Task onClick={clickHandler} />);
    task.simulate("click");
    expect(clickHandler).toBeCalled();
  });
  it("does not apply onClick prop", function() {
    const clickHandler = jest.fn();
    const task = mount(<Task />);
    task.simulate("click");
    expect(clickHandler).not.toBeCalled();
  });
  it("applies selected CSS class if true", function() {
    const task = mount(<Task selected />);
    expect(task.props().selected).toBe(true);
    expect(task.find("span").html()).toContain("selected");
  });
});
