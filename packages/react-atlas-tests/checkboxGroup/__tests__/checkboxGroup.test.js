import React from "react";
import { mount, shallow } from "enzyme";
import { default as CheckboxGroup } from "../../../react-atlas-core/src/CheckboxGroup/CheckboxGroup";
import { default as Checkbox } from "../../../react-atlas-core/src/Checkbox/Checkbox";
import { verifyPropsDefaultValue } from "../../utils/propsVerification";

import { default as Button } from "../../../react-atlas-core/src/button/Button";

describe("Test CheckboxGroup component - the bascis", () => {
  it("Checkbox group - 4 checkboxes, 1 checked", function() {
    const component = mount(
      <CheckboxGroup title={"CheckboxGroup test"}>
        <Checkbox name={"1"} />
        <Checkbox name={"2"} />
        <Checkbox name={"3"} />
        <Checkbox name={"4"} />
      </CheckboxGroup>
    );

    component.childAt(1).simulate("click");

    expect(component.state().totalChecked).toBe(1);
  });

  it("Checkbox group - 4 checkboxes, 2 checked 1 from creation", function() {
    const component = mount(
      <CheckboxGroup title={"CheckboxGroup test"}>
        <Checkbox name={"1"} checked={true} />
        <Checkbox name={"2"} />
        <Checkbox name={"3"} />
        <Checkbox name={"4"} />
      </CheckboxGroup>
    );

    component.childAt(2).simulate("click");

    expect(component.state().totalChecked).toBe(2);
  });

  it("Checkbox group - 4 checkboxes, 0 checked with 1 checked from creation", function() {
    const component = mount(
      <CheckboxGroup title={"CheckboxGroup test"}>
        <Checkbox name={"1"} />
        <Checkbox name={"2"} />
        <Checkbox name={"3"} />
        <Checkbox name={"4"} />
      </CheckboxGroup>
    );

    component.childAt(0).simulate("click");

    expect(component.state().totalChecked).toBe(0);
  });

  it("Checkbox group - 4 checkboxes, 3 checked", function() {
    const component = mount(
      <CheckboxGroup title={"CheckboxGroup test"}>
        <Checkbox name={"1"} />
        <Checkbox name={"2"} />
        <Checkbox name={"3"} />
        <Checkbox name={"4"} />
      </CheckboxGroup>
    );

    component.childAt(1).simulate("click");
    component.childAt(2).simulate("click");
    component.childAt(3).simulate("click");

    expect(component.state().totalChecked).toBe(3);
  });

  it("Checkbox group - 4 checkboxes, 2 checked", function() {
    const component = mount(
      <CheckboxGroup title={"CheckboxGroup test"}>
        <Checkbox name={"1"} />
        <Checkbox name={"2"} />
        <Checkbox name={"3"} />
        <Checkbox name={"4"} />
      </CheckboxGroup>
    );

    component.childAt(1).simulate("click");
    component.childAt(2).simulate("click");
    component.childAt(3).simulate("click");

    expect(component.state().totalChecked).toBe(3);

    component.childAt(1).simulate("click");

    expect(component.state().totalChecked).toBe(2);
  });
});

function _verifyMinMax(mi, ma, numberOfClicks, message, expectedResult) {
  const component = mount(
    <CheckboxGroup title={"CheckboxGroup test"} min={mi} max={ma}>
      <Checkbox name={"1"} />
      <Checkbox name={"2"} />
      <Checkbox name={"3"} />
      <Checkbox name={"4"} />
      <Checkbox name={"5"} />
    </CheckboxGroup>
  );
  if (message != "") {
    component.limitMessage = message;
  }
  for (let i = 1; i <= numberOfClicks; i++) {
    component.childAt(i).simulate("click");
  }

  expect(component.state().groupError).toBe(expectedResult);
}

describe("Test CheckboxGroup component - Min/Max tests", () => {
  it("Checkbox group - 5 checkboxes, max=4, min=2, 1 checked", function() {
    _verifyMinMax(2, 4, 1, "Limit exceed!!", true);
  });
  it("Checkbox group - 5 checkboxes, max=4, min=2, 1 checked", function() {
    _verifyMinMax(2, 4, 2, "Limit exceed!!", false);
  });
  it("Checkbox group - 5 checkboxes, max=4, min=2, 3 checked", function() {
    _verifyMinMax(2, 4, 3, "Limit exceed!!", false);
  });
  it("Checkbox group - 5 checkboxes, max=4, min=2, 1 checked", function() {
    _verifyMinMax(2, 4, 4, "Limit exceed!!", false);
  });
  it("Checkbox group - 5 checkboxes, max=4, min=2, 5 checked", function() {
    _verifyMinMax(2, 4, 5, "Limit exceed!!", true);
  });
  it("Checkbox group - 5 checkboxes, max=4, min=2, 1 checked no Limmit message", function() {
    _verifyMinMax(2, 4, 1, "", true);
  });
  it("Checkbox group - 5 checkboxes, max=4, min=2, 5 checked no Limmit message", function() {
    _verifyMinMax(2, 4, 5, "", true);
  });

  it("Checkbox group - 5 checkboxes, max=4, min=2, 3 checked", function() {
    const component = mount(
      <CheckboxGroup
        title={"CheckboxGroup test"}
        max={4}
        min={2}
        limitMessage={"Limit exceed!!"}
      >
        <Checkbox name={"1"} />
        <Checkbox name={"2"} />
        <Checkbox name={"3"} />
        <Checkbox name={"4"} />
        <Checkbox name={"5"} />
      </CheckboxGroup>
    );

    for (let i = 1; i <= 5; i++) {
      component.childAt(i).simulate("click");
    }

    expect(component.state().groupError).toBe(true);

    component.childAt(2).simulate("click");
    component.childAt(0).simulate("click");

    expect(component.state().groupError).toBe(false);
  });
});
