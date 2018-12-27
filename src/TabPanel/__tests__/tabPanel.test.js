import React from "react";
import { mount } from "enzyme";
import { TabPanel } from "../index";
import renderer from "react-test-renderer";

describe("Test dropdown component", () => {
  it("Test render correctly", () => {
    const comp = (
      <TabPanel>
        <h2>Content 1</h2>
        <p>Tab content here</p>
      </TabPanel>
    );
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders border", () => {
    const tp = mount(
      <TabPanel bordered>
        <h2>Content 1</h2>
        <p>Tab content here</p>
      </TabPanel>
    );

    expect(tp.find(".bordered").exists()).toBe(true);
  });

  it("renders vertical", () => {
    const tp = mount(
      <TabPanel vertical>
        <h2>Content 1</h2>
        <p>Tab content here</p>
      </TabPanel>
    );

    expect(tp.find(".vertical").exists()).toBe(true);
  });

  it("applies className", () => {
    const tp = mount(
      <TabPanel className="myClass">
        <h2>Content 1</h2>
        <p>Tab content here</p>
      </TabPanel>
    );

    expect(tp.find(".myClass").exists()).toBe(true);
  });

  it("applies style", () => {
    const tp = mount(
      <TabPanel className="myClass" style={{ color: "red" }}>
        <h2>Content 1</h2>
        <p>Tab content here</p>
      </TabPanel>
    );
    expect(tp.find("div.myClass").props().style).toEqual({ color: "red" });
  });

  it("handles defaults", () => {
    const tp = mount(
      <TabPanel>
        <h2>Content 1</h2>
        <p>Tab content here</p>
      </TabPanel>
    );

    expect(tp.find(".bordered").exists()).not.toBe(true);
    expect(tp.find(".vertical").exists()).not.toBe(true);
    expect(tp.state().selected).toBe(false);
  });

  it("CWRP updates selected", () => {
    const tp = mount(
      <TabPanel>
        <h2>Content 1</h2>
        <p>Tab content here</p>
      </TabPanel>
    );

    expect(tp.state().selected).toBe(false);
    tp.setProps({ selected: true });
    expect(tp.state().selected).toBe(true);
    tp.setProps({ selected: false });
    expect(tp.state().selected).toBe(false);
    //again to get the else branch
    tp.setProps({ selected: false });
    expect(tp.state().selected).toBe(false);
  });
});
