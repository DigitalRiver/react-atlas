import React from "react";
import { mount } from "enzyme";
import { RadioCore } from "../../../react-atlas-core/src/Radio/index";

import renderer from "react-test-renderer";

describe("Test Radio component render", () => {
  it("Render correctly", () => {
    const tree = renderer
      .create(
        <RadioCore
          label={"Checked Radio"}
          value={"checkedRadio"}
          defaultChecked={true}
          className={"class"}
          title={"TITLE"}
          hidden={false}
          inline={true}
          name={"Mr radio"}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing radio component", () => {
  it("Radio - Basic test", function() {
    const result = mount(
      <RadioCore
        label={"Checked Radio"}
        value={"checkedRadio"}
        defaultChecked={true}
        className={"class"}
        title={"TITLE"}
        hidden={false}
        inline={true}
        name={"Mr radio"}
      />
    );
  });

  it("Radio - Basic test", function() {
    const result = mount(
      <RadioCore
        label="Checked Radio"
        value="checkedRadio"
        labelPosition={"left"}
      />
    );
  });

  it("Radio - Default checked test", function() {
    const rad = mount(
      <RadioCore
        checked={true}
        label="Checked Radio"
        value="checkedRadio"
        groupSetChecked={function() {}}
      />
    );
    expect(rad.props().checked).toEqual(true);
  });

  it("Radio - Simple click test", function() {
    const rad = mount(
      <RadioCore
        label="Checked Radio"
        value="checkedRadio"
        groupSetChecked={function() {}}
      />
    );
    rad.simulate("click");
  });

  it("Radio - Simple click test (disabled)", function() {
    const rad = mount(
      <RadioCore
        disabled={true}
        label="Checked Radio"
        value="checkedRadio"
        groupSetChecked={function() {}}
      />
    );
    rad.simulate("click");
  });

  it("Radio - Simple click test (with onBeforeChange)", function() {
    const rad = mount(
      <RadioCore
        label="Checked Radio"
        value="checkedRadio"
        groupSetChecked={function() {}}
        onClick={function() {
          console.log("onclick");
        }}
        onChange={function() {
          console.log("onchange");
        }}
        onBeforeChange={function() {
          console.log("onbeforechange");
        }}
      />
    );
    rad.simulate("click");
  });

  it("Radio - Simple click test (without onBeforeChange)", function() {
    const rad = mount(
      <RadioCore
        label="Checked Radio"
        value="checkedRadio"
        groupSetChecked={function() {}}
        onClick={function() {
          console.log("onclick");
        }}
        onChange={function() {
          console.log("onchange");
        }}
      />
    );
    rad.simulate("click");
  });

  it("Radio - Simple click test (without onBeforeChange) checked", function() {
    const rad = mount(
      <RadioCore
        checked={true}
        label="Checked Radio"
        value="checkedRadio"
        groupSetChecked={function() {}}
        onClick={function() {
          console.log("onclick");
        }}
        onChange={function() {
          console.log("onchange");
        }}
      />
    );
    rad.simulate("click");
  });
});
