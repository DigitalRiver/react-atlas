import React from "react";
import { mount } from "enzyme";
import { NavCore } from "../../../react-atlas-core/src/Nav/index";
import { NavItemCore } from "../../../react-atlas-core/src/NavItem/index";
import renderer from "react-test-renderer";

describe("Test Nav component render", () => {
  it("Render correctly", () => {
    const tree = renderer
      .create(
        <NavCore>
          <NavItemCore navKey={0}>HOME</NavItemCore>
          <NavItemCore navKey={1}>Catalog</NavItemCore>
          <NavItemCore navKey={2}>Customer Service</NavItemCore>
          <NavItemCore navKey={3}>Administration</NavItemCore>
          <NavItemCore navKey={4}>Support</NavItemCore>
        </NavCore>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const _findItem = (node, navKey) =>
  node.name() === "NavItem" && node.props().navKey === navKey;

const _findActiveItem = node =>
  node.name() === "NavItem" && node.props().active;

describe("Testing Nav component", () => {
  it("Nav - Simple default select NavItem", function() {
    const result = mount(
      <NavCore activeIndex={1}>
        <NavItemCore navKey={0}>HOME</NavItemCore>
        <NavItemCore navKey={1}>Catalog</NavItemCore>
        <NavItemCore navKey={2}>Customer Service</NavItemCore>
        <NavItemCore navKey={3}>Administration</NavItemCore>
        <NavItemCore navKey={4}>Support</NavItemCore>
      </NavCore>
    );
    expect(result.findWhere(n => _findActiveItem(n)).props().navKey).toEqual(1);
  });
  it("Nav - Default select inner NavItem", function() {
    const result = mount(
      <NavCore activeIndex={3.1}>
        <NavItemCore navKey={0}>HOME</NavItemCore>
        <NavItemCore navKey={1}>Catalog</NavItemCore>
        <NavCore>
          <NavItemCore navKey={3}>Reports</NavItemCore>
          <NavItemCore navKey={3.1}>Create a Report</NavItemCore>
          <NavItemCore navKey={3.2}>Edit a Report</NavItemCore>
        </NavCore>
        <NavItemCore navKey={4}>Administration</NavItemCore>
        <NavItemCore navKey={5}>Support</NavItemCore>
      </NavCore>
    );
    expect(result.findWhere(n => _findActiveItem(n)).props().navKey).toEqual(
      3.1
    );
  });
  it("Nav - Click to changing active NavItem", function() {
    const result = mount(
      <NavCore activeIndex={1}>
        <NavItemCore navKey={0}>HOME</NavItemCore>
        <NavItemCore navKey={1}>Catalog</NavItemCore>
        <NavItemCore navKey={2}>Customer Service</NavItemCore>
        <NavCore>
          <NavItemCore navKey={3}>Reports</NavItemCore>
          <NavItemCore navKey={3.1}>Create a Report</NavItemCore>
          <NavItemCore navKey={3.2}>Edit a Report</NavItemCore>
        </NavCore>
        <NavItemCore navKey={4}>Support</NavItemCore>
      </NavCore>
    );
    result
      .findWhere(n => _findItem(n, 2))
      .find("button")
      .simulate("click");
    expect(result.findWhere(n => _findActiveItem(n)).props().navKey).toEqual(2);

    result
      .findWhere(n => _findItem(n, 3.1))
      .find("button")
      .simulate("click");
    expect(result.findWhere(n => _findActiveItem(n)).props().navKey).toEqual(
      3.1
    );
  });
});
