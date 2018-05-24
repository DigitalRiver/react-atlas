import React from "react";
import { mount } from "enzyme";
import { Switch } from "../index";

import renderer from "react-test-renderer";

describe("Test switch component render", () => {
  it("Render correctly", () => {
    const tree = renderer
      .create(
        <Switch
          className={"Class"}
          disabled={false}
          hidden={false}
          checked={false}
          name={"Name"}
          id={"ID"}
          onColor={"black"}
          onClick={() => {}}
          offColor={"white"}
          buttonColor={"grey"}
          small={false}
          medium
          large={false}
          onChange={() => {}}
          onBeforeChange={() => {}}
          inline={false}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing switch component", () => {
  it("Change Props", () => {
    const swich = mount(
      <Switch
        className={"Class"}
        disabled={false}
        hidden={false}
        checked={false}
        name={"Name"}
        id={"ID"}
        onColor={"black"}
        onClick={() => {}}
        offColor={"white"}
        buttonColor={"grey"}
        small={false}
        medium
        large={false}
        onChange={() => {}}
        onBeforeChange={() => {}}
        inline={false}
      />
    );

    swich.setProps({ "name": "NewName" });

    swich.setProps({ "checked": true });
    expect(swich.state().checked).toEqual(true);

    swich.setProps({ "disabled": true });
    expect(swich.state().disabled).toEqual(true);
  });

  it("Switch component - Basic test one click switch", function() {
    const comp = mount(<Switch onColor="black" />);
    expect(comp.state().checked).toEqual(false);
    comp.find("Input").simulate("click");
    expect(comp.state().checked).toEqual(true);
  });

  it("Switch component - Basic test one click switch(onClick)", function() {
    const comp = mount(
      <Switch
        onColor="black"
        onClick={() => {
          console.log("onClick triggered");
        }}
      />
    );
    expect(comp.state().checked).toEqual(false);
    comp.find("Input").simulate("click");
    expect(comp.state().checked).toEqual(true);
  });

  it("Switch component - Basic test one click switch(onChange)", function() {
    const comp = mount(
      <Switch
        onColor="black"
        onChange={() => {
          console.log("onChange triggered");
        }}
      />
    );
    expect(comp.state().checked).toEqual(false);
    comp.find("Input").simulate("click");
    expect(comp.state().checked).toEqual(true);
  });

  it("Switch component - Basic test two clicks switch", function() {
    const comp = mount(<Switch onColor="black" />);
    expect(comp.state().checked).toEqual(false);
    comp.find("Input").simulate("click");
    expect(comp.state().checked).toEqual(true);
    comp.find("Input").simulate("click");
    expect(comp.state().checked).toEqual(false);
  });

  it("Switch component - Basic test one click switch with onBeforeChange", function() {
    const comp = mount(
      <Switch
        onColor="black"
        onBeforeChange={function() {
          console.log("onBeforeChange triggered");
          return true;
        }}
      />
    );
    expect(comp.state().checked).toEqual(false);
    comp.find("Input").simulate("click");
    expect(comp.state().checked).toEqual(true);
  });

  it("Switch component - Basic test one click switch with onBeforeChange II", function() {
    const comp = mount(
      <Switch
        onColor="black"
        onBeforeChange={function() {
          console.log("onBeforeChange triggered");
          return false;
        }}
      />
    );
    expect(comp.state().checked).toEqual(false);
    comp.find("Input").simulate("click");
    expect(comp.state().checked).toEqual(false);
  });
});
