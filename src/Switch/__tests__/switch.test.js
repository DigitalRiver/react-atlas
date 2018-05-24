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
});
