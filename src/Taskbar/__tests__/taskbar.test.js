import React from "react";
import { mount } from "enzyme";
import { Taskbar } from "../index";
import { Task } from "../../Task/index";
import renderer from "react-test-renderer";

describe("Test Taskbar component", () => {
  it("Test render correctly", () => {
    const comp = (
      <Taskbar>
        <Task icon={"fa fa-id-card"} title="Item One" selected />
        <Task title="Item Two" />
        <Task title="Item Three" />
      </Taskbar>
    );
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("centers", () => {
    const taskbar = mount(
      <Taskbar center>
        <Task icon={"fa fa-id-card"} title="Item One" selected />
        <Task title="Item Two" />
        <Task title="Item Three" />
      </Taskbar>
    );

    expect(taskbar.find(".taskbarContainer.center").exists()).toBe(true);
  });

  it("applies className", () => {
    const taskbar = mount(
      <Taskbar className="myClass">
        <Task icon={"fa fa-id-card"} title="Item One" selected />
        <Task title="Item Two" />
        <Task title="Item Three" />
      </Taskbar>
    );

    expect(taskbar.find(".myClass.taskbar").exists()).toBe(true);
  });

  it("applies style", () => {
    const taskbar = mount(
      <Taskbar className="myClass" style={{ color: "red" }}>
        <Task icon={"fa fa-id-card"} title="Item One" selected />
        <Task title="Item Two" />
        <Task title="Item Three" />
      </Taskbar>
    );

    expect(taskbar.find(".myClass.taskbar").props().style).toEqual({
      color: "red"
    });
  });

  it("passes onClick to children", () => {
    const handleClick = jest.fn();
    const taskbar = mount(
      <Taskbar onClick={handleClick}>
        <Task icon={"fa fa-id-card"} title="Item One" selected />
        <Task title="Item Two" />
        <Task title="Item Three" />
      </Taskbar>
    );

    taskbar
      .find("Task")
      .first()
      .simulate("click");
    expect(handleClick).toBeCalled();
  });
});
