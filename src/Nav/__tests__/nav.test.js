import React from "react";
import { mount } from "enzyme";
import { Nav } from "../index";
import { NavItem } from "../../NavItem";
import renderer from "react-test-renderer";
import data from "./data";

describe("Test Nav component render", () => {
  it("Render correctly", () => {
    const tree = renderer
      .create(
        <Nav>
          <NavItem navKey={0}>HOME</NavItem>
          <NavItem navKey={1}>Catalog</NavItem>
          <NavItem navKey={2}>Customer Service</NavItem>
          <NavItem navKey={3}>Administration</NavItem>
          <NavItem navKey={4}>Support</NavItem>
        </Nav>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const _findItem = (node, navKey) =>
  node.name() === "NavItem" && node.props().navKey === navKey;

const _findActiveItem = node =>
  node.name() === "NavItem" && node.props().active;

describe("Test Nav component - Basic tests", () => {
  it("Nav - Simple default select NavItem", function() {
    const result = mount(
      <Nav activeIndex={1}>
        <NavItem navKey={0}>HOME</NavItem>
        <NavItem navKey={1}>Catalog</NavItem>
        <NavItem navKey={2}>Customer Service</NavItem>
        <NavItem navKey={3}>Administration</NavItem>
        <NavItem navKey={4}>Support</NavItem>
      </Nav>
    );
    expect(result.findWhere(n => _findActiveItem(n)).props().navKey).toEqual(1);
  });
  it("Nav - Default select inner NavItem", function() {
    const result = mount(
      <Nav activeIndex={3.1}>
        <NavItem navKey={0}>HOME</NavItem>
        <NavItem navKey={1}>Catalog</NavItem>
        <Nav>
          <NavItem navKey={3}>Reports</NavItem>
          <NavItem navKey={3.1}>Create a Report</NavItem>
          <NavItem navKey={3.2}>Edit a Report</NavItem>
        </Nav>
        <NavItem navKey={4}>Administration</NavItem>
        <NavItem navKey={5}>Support</NavItem>
      </Nav>
    );
    expect(result.findWhere(n => _findActiveItem(n)).props().navKey).toEqual(
      3.1
    );
  });

  it("Nav - Click to changing active NavItem", function() {
    const result = mount(
      <Nav activeIndex={1}>
        <NavItem navKey={0}>HOME</NavItem>
        <NavItem navKey={1}>Catalog</NavItem>
        <NavItem navKey={2}>Customer Service</NavItem>
        <Nav>
          <NavItem navKey={3}>Reports</NavItem>
          <NavItem navKey={3.1}>Create a Report</NavItem>
          <NavItem navKey={3.2}>Edit a Report</NavItem>
        </Nav>
        <NavItem navKey={4}>Support</NavItem>
      </Nav>
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

  it("Nav - handle collapse", function() {
    const nav = mount(
      <Nav activeIndex={1}>
        <NavItem navKey={0}>HOME</NavItem>
        <NavItem navKey={1}>Catalog</NavItem>
        <NavItem navKey={2}>Customer Service</NavItem>
        <Nav className="myNav">
          <NavItem navKey={3}>Reports</NavItem>
          <NavItem navKey={3.1}>Create a Report</NavItem>
          <NavItem navKey={3.2}>Edit a Report</NavItem>
        </Nav>
        <NavItem navKey={4}>Support</NavItem>
      </Nav>
    );
    const myNav = nav.find(".myNav").first();
    expect(myNav.instance().state.collapsed).toBe(false);
    nav
      .find(".myNav")
      .first()
      .find("button")
      .first()
      .simulate("click");
    expect(myNav.instance().state.collapsed).toBe(true);
  });
});

describe("Test JSON data to rendering Nav component", () => {
  it("Simple default select NavItem", () => {
    const result = mount(<Nav activeIndex={2} data={data} />);
    expect(result.findWhere(n => _findActiveItem(n)).props().navKey).toEqual(2);
  });
});
