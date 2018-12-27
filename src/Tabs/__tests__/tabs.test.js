import React from "react";
import { mount } from "enzyme";
import { Tabs } from "../index";
import { TabList } from "../../TabList/index";
import { Tab } from "../../Tab/index";
import { TabPanel } from "../../TabPanel/index";
import renderer from "react-test-renderer";

describe("Test dropdown component", () => {
  it("Test render correctly", () => {
    const comp = (
      <Tabs>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
          <Tab>Tab 4</Tab>
          <Tab>Tab 5</Tab>
        </TabList>
        <TabPanel>
          <h2>Content 1</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            laoreet lorem sit amet finibus rutrum. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia Curae;
            Pellentesque habitant morbi tristique senectus et netus et malesuada{" "}
            <a href="http://lipsum.com">fames ac turpis egestas</a> et siem.
          </p>
        </TabPanel>
        <TabPanel>
          <h2>Content 2</h2>
          <p>Tab content here</p>
        </TabPanel>
        <TabPanel>
          <h2>Content 3</h2>
          <p>Tab content here</p>
        </TabPanel>
        <TabPanel>
          <h2>Content 4</h2>
          <p>Tab content here</p>
        </TabPanel>
        <TabPanel>
          <h2>Content 5</h2>
          <p>Tab content here</p>
        </TabPanel>
      </Tabs>
    );
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders border", () => {
    const tabs = mount(
      <Tabs bordered>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanel>
          <h2>Content 1</h2>
          <p>
            Lorem ipsum dolor sit amet{" "}
            <a href="http://lipsum.com">fames ac turpis egestas</a> et siem.
          </p>
        </TabPanel>
        <TabPanel>
          <h2>Content 2</h2>
          <p>Tab content here</p>
        </TabPanel>
      </Tabs>
    );

    expect(tabs.find(".bordered").exists()).toBe(true);
  });

  it("sets defaults", () => {
    const tabs = mount(
      <Tabs>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanel>
          <h2>Content 1</h2>
          <p>
            Lorem ipsum dolor sit amet{" "}
            <a href="http://lipsum.com">fames ac turpis egestas</a> et siem.
          </p>
        </TabPanel>
        <TabPanel>
          <h2>Content 2</h2>
          <p>Tab content here</p>
        </TabPanel>
      </Tabs>
    );

    expect(tabs.find(".bordered").exists()).not.toBe(true);
    expect(tabs.find(".vertical").exists()).not.toBe(true);
    expect(tabs.state().selectedIndex).toBe(0);
  });

  it("applies className", () => {
    const tabs = mount(
      <Tabs className="myClass">
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanel>
          <h2>Content 1</h2>
          <p>
            Lorem ipsum dolor sit amet{" "}
            <a href="http://lipsum.com">fames ac turpis egestas</a> et siem.
          </p>
        </TabPanel>
        <TabPanel>
          <h2>Content 2</h2>
          <p>Tab content here</p>
        </TabPanel>
      </Tabs>
    );

    expect(tabs.find(".myClass").exists()).toBe(true);
  });

  it("handles onSelect", () => {
    const handleOnSelect = jest.fn();
    const tabs = mount(
      <Tabs onSelect={handleOnSelect}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanel>
          <h2>Content 1</h2>
          <p>
            Lorem ipsum dolor sit amet{" "}
            <a href="http://lipsum.com">fames ac turpis egestas</a> et siem.
          </p>
        </TabPanel>
        <TabPanel>
          <h2>Content 2</h2>
          <p>Tab content here</p>
        </TabPanel>
      </Tabs>
    );

    tabs
      .find("Tab")
      .first()
      .simulate("click");
    expect(handleOnSelect).toBeCalledWith(0, expect.any(Object));
    expect(tabs.state().selectedIndex).toBe(0);
    tabs
      .find("Tab")
      .last()
      .simulate("click");
    expect(handleOnSelect).toBeCalledWith(1, expect.any(Object));
    expect(tabs.state().selectedIndex).toBe(1);
  });

  it("does not run onSelect when onSelect prop not present", () => {
    const handleOnSelect = jest.fn();
    const tabs = mount(
      <Tabs>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanel>
          <h2>Content 1</h2>
          <p>
            Lorem ipsum dolor sit amet{" "}
            <a href="http://lipsum.com">fames ac turpis egestas</a> et siem.
          </p>
        </TabPanel>
        <TabPanel>
          <h2>Content 2</h2>
          <p>Tab content here</p>
        </TabPanel>
      </Tabs>
    );

    tabs
      .find("Tab")
      .first()
      .simulate("click");
    expect(handleOnSelect).not.toBeCalled();
  });

  it("sets selectedIndex to 0 by default", () => {
    const handleOnSelect = jest.fn();
    const tabs = mount(
      <Tabs onSelect={handleOnSelect}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanel>
          <h2>Content 1</h2>
          <p>
            Lorem ipsum dolor sit amet{" "}
            <a href="http://lipsum.com">fames ac turpis egestas</a> et siem.
          </p>
        </TabPanel>
        <TabPanel>
          <h2>Content 2</h2>
          <p>Tab content here</p>
        </TabPanel>
      </Tabs>
    );

    expect(tabs.state().selectedIndex).toBe(0);
  });

  it("CWRP updates selectedIndex state", () => {
    const tabs = mount(
      <Tabs>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanel>
          <h2>Content 1</h2>
          <p>
            Lorem ipsum dolor sit amet{" "}
            <a href="http://lipsum.com">fames ac turpis egestas</a> et siem.
          </p>
        </TabPanel>
        <TabPanel>
          <h2>Content 2</h2>
          <p>Tab content here</p>
        </TabPanel>
      </Tabs>
    );

    expect(tabs.state().selectedIndex).toBe(0);
    tabs.setProps({ selectedIndex: 1 });
    expect(tabs.state().selectedIndex).toBe(1);
  });

  it("applies style", () => {
    const tabs = mount(
      <Tabs style={{ color: "red" }}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanel>
          <h2>Content 1</h2>
          <p>
            Lorem ipsum dolor sit amet{" "}
            <a href="http://lipsum.com">fames ac turpis egestas</a> et siem.
          </p>
        </TabPanel>
        <TabPanel>
          <h2>Content 2</h2>
          <p>Tab content here</p>
        </TabPanel>
      </Tabs>
    );

    expect(tabs.find(".tabs").props().style).toEqual({ color: "red" });
  });

  it("applies vertical", () => {
    const tabs = mount(
      <Tabs vertical>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanel>
          <h2>Content 1</h2>
          <p>
            Lorem ipsum dolor sit amet{" "}
            <a href="http://lipsum.com">fames ac turpis egestas</a> et siem.
          </p>
        </TabPanel>
        <TabPanel>
          <h2>Content 2</h2>
          <p>Tab content here</p>
        </TabPanel>
      </Tabs>
    );

    expect(tabs.find(".vertical.tabs").exists()).toBe(true);
  });
});
