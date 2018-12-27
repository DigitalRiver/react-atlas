import React from "react";
import { mount } from "enzyme";
import { Tab } from "../index";
import renderer from "react-test-renderer";

describe("Test dropdown component", () => {
  it("Test render correctly", () => {
    const comp = <Tab>My Tab</Tab>;
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("applies className", () => {
    const tab = mount(<Tab className="myClass">My Tab</Tab>);

    expect(tab.find(".myClass").exists()).toBe(true);
  });

  it("sets defaults", () => {
    const tab = mount(<Tab>My Tab</Tab>);

    expect(tab.state().selected).toBe(false);
    expect(tab.state().disabled).toBe(false);
    expect(tab.props().selected).toBe(false);
    expect(tab.props().disabled).toBe(false);
  });

  it("applies disabled", () => {
    const tab = mount(<Tab disabled>My Tab</Tab>);

    expect(tab.state().disabled).toBe(true);
    expect(tab.props().disabled).toBe(true);
  });

  it("applies icon", () => {
    const tab = mount(<Tab icon="fa fa-github">My Tab</Tab>);

    expect(tab.find("i.fa.fa-github").exists()).toBe(true);
  });

  it("applies selected", () => {
    const tab = mount(<Tab selected>My Tab</Tab>);

    expect(tab.state().selected).toBe(true);
    expect(tab.props().selected).toBe(true);
  });

  it("handles setSelectedTab", () => {
    const handleSelect = jest.fn();
    const tab = mount(<Tab setSelectedTab={handleSelect}>My Tab</Tab>);

    tab.simulate("click");
    expect(handleSelect).toBeCalled();
  });

  it("does not call setSelectedTab when disabled", () => {
    const handleSelect = jest.fn();
    const tab = mount(
      <Tab disabled setSelectedTab={handleSelect}>
        My Tab
      </Tab>
    );

    tab.simulate("click");
    expect(handleSelect).not.toBeCalled();
  });

  it("applies style", () => {
    const tab = mount(<Tab style={{ color: "red" }}>My Tab</Tab>);

    expect(tab.find("li").props().style).toEqual({ color: "red" });
  });

  it("applies vertical", () => {
    const tab = mount(
      <Tab vertical selected>
        My Tab
      </Tab>
    );

    expect(tab.find(".vTab").exists()).toBe(true);
    expect(tab.find(".vSelected").exists()).toBe(true);
  });

  it("CWRP updates selected", () => {
    const tab = mount(
      <Tab vertical selected>
        My Tab
      </Tab>
    );
    //starting true to catch else branch
    expect(tab.state().selected).toBe(true);
    tab.setProps({ selected: true });
    expect(tab.state().selected).toBe(true);
    tab.setProps({ selected: false });
    expect(tab.state().selected).toBe(false);
    tab.setProps({ selected: true });
    expect(tab.state().selected).toBe(true);
  });
});
