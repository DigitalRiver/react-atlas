import React from "react";
import { mount } from "enzyme";
import { Nav } from "../../Nav/index";
import { NavItem } from "../index";
import { NavLink, HashRouter } from "react-router-dom";

import renderer from "react-test-renderer";

describe("Test correct render", () => {
  it("Test correct render", function() {
    const tree = renderer.create(<NavItem navKey={0}>HOME</NavItem>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing NavItem component", () => {
  it("Should render children", function() {
    const navItem = mount(<NavItem navKey={0}>HOME</NavItem>);
    expect(navItem.props().children).toBe("HOME");
    expect(navItem.find("button").text()).toBe("HOME");
  });

  it("Should require children", function() {
    console.error = jest.fn();
    const navItem = mount(<NavItem navKey={0} />); //eslint-disable-line no-unused-vars
    expect(global.console.error).toBeCalled();
  });

  it("Should require navKey", function() {
    console.error = jest.fn();
    const navItem = mount(<NavItem>HOME</NavItem>); //eslint-disable-line no-unused-vars
    expect(global.console.error).toBeCalled();
  });

  it("Should require navKey to be a number", function() {
    console.error = jest.fn();
    const navItem = mount(<NavItem navKey="a">HOME</NavItem>); //eslint-disable-line no-unused-vars
    expect(global.console.error).toBeCalled();
  });

  it("Should apply classes passed in className", function() {
    const navItem = mount(
      <NavItem className="myClass" navKey={0}>
        HOME
      </NavItem>
    );
    expect(navItem.props().className).toBe("myClass");
    expect(navItem.find("li").html()).toContain("myClass");
  });

  it("Should be disabled when disabled prop is true", function() {
    const navItem = mount(
      <NavItem disabled navKey={0}>
        HOME
      </NavItem>
    );
    expect(navItem.find("li").html()).toContain("disabled");
    expect(navItem.find("li").props().className).toContain("disabled");
    expect(navItem.find("button").html()).toContain("disabled");
    expect(navItem.find("button").props().className).toContain("disabled");
  });

  it("Should pass href", function() {
    const navItem = mount(
      <NavItem href="http://www.digitalriver.com" navKey={0}>
        HOME
      </NavItem>
    );
    expect(navItem.find("a").exists()).toBe(true);
    expect(navItem.find("a").props().href).toBe("http://www.digitalriver.com");
  });

  it("If as prop contains value, render Link element", function() {
    const navItem = mount(
      <HashRouter hashType="noslash">
        <Nav activeIndex={0}>
          <Nav>
            <NavItem navKey={0} as={NavLink} to="button">
              HOME
            </NavItem>
          </Nav>
        </Nav>
      </HashRouter>
    );
    expect(navItem.find("a").exists()).toBe(true);
    expect(navItem.find("Link").exists()).toBe(true);
  });

  it("If prop to exists, Button href and onClick should be null", function() {
    const navItem = mount(
      <HashRouter hashType="noslash">
        <Nav activeIndex={0}>
          <Nav>
            <NavItem navKey={0} as={NavLink} to="button">
              HOME
            </NavItem>
          </Nav>
        </Nav>
      </HashRouter>
    );
    expect(navItem.find("Button").props().href).toBe(null);
    expect(navItem.find("Button").props().onClick).toBe(null);
  });

  it("Should pass style", function() {
    const navItem = mount(
      <NavItem style={{ "color": "red" }} navKey={0}>
        HOME
      </NavItem>
    );
    expect(navItem.props().style).toEqual({ "color": "red" });
    expect(navItem.html()).toContain('style="color: red;"');
  });

  it("Should not have onClick if onClick is not in props", function() {
    const navItem = mount(<NavItem navKey={0}>HOME</NavItem>);
    expect(typeof navItem.props().onClick).toBe("undefined");
  });
});
