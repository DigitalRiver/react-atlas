import React from "react";
import { mount, shallow } from "enzyme";
import { CheckboxGroupCore } from "../../../react-atlas-core/src/CheckboxGroup/index";
import { CheckboxCore } from "../../../react-atlas-core/src/Checkbox/index";
import { verifyPropsDefaultValue } from "../../utils/propsVerification";

import renderer from "react-test-renderer";

import { default as Button } from "../../../react-atlas-core/src/Button/Button";

describe("Test CheckboxGroup component - the basics", () => {
  it("Checkbox group - 4 checkboxes, 1 checked", function() {
    const component = mount(
      <CheckboxGroupCore title={"CheckboxGroup test"}>
        <CheckboxCore name={"1"} />
        <CheckboxCore name={"2"} />
        <CheckboxCore name={"3"} />
        <CheckboxCore name={"4"} />
      </CheckboxGroupCore>
    );
    component
      .childAt(0)
      .childAt(1)
      .simulate("click");
    component.update();
    expect(component.state().totalChecked).toBe(1);
  });

  it("Checkbox group - 4 checkboxes, 1 checked (with onChange)", function() {
    const component = mount(
      <CheckboxGroupCore
        title={"CheckboxGroup test"}
        onChange={(value, event, isValid, checked) => {
          console.log("onChange triggered!!");
        }}
      >
        <CheckboxCore name={"1"} />
        <CheckboxCore name={"2"} />
        <CheckboxCore name={"3"} />
        <CheckboxCore name={"4"} />
      </CheckboxGroupCore>
    );

    component
      .childAt(0)
      .childAt(1)
      .simulate("click");
    component.update();
    expect(component.state().totalChecked).toBe(1);
  });

  it("Test renders correctly", () => {
    const comp = (
      <CheckboxGroupCore title={"CheckboxGroup test"}>
        <CheckboxCore name={"1"} />
        <CheckboxCore name={"2"} />
        <CheckboxCore name={"3"} />
        <CheckboxCore name={"4"} />
      </CheckboxGroupCore>
    );
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test CheckboxGroup component - the basics", () => {
  it("Checkbox group - 4 checkboxes, 1 checked", function() {
    const component = mount(
      <CheckboxGroupCore title={"CheckboxGroup test"}>
        <CheckboxCore name={"1"} />
        <CheckboxCore name={"2"} />
        <CheckboxCore name={"3"} />
        <CheckboxCore name={"4"} />
      </CheckboxGroupCore>
    );

    component
      .childAt(0)
      .childAt(1)
      .simulate("click");
    component.update();
    expect(component.state().totalChecked).toBe(1);
  });

  it("Checkbox group - 4 checkboxes, 2 checked 1 from creation", function() {
    const component = mount(
      <CheckboxGroupCore title={"CheckboxGroup test"}>
        <CheckboxCore name={"1"} checked={true} />
        <CheckboxCore name={"2"} />
        <CheckboxCore name={"3"} />
        <CheckboxCore name={"4"} />
      </CheckboxGroupCore>
    );

    component
      .childAt(0)
      .childAt(2)
      .simulate("click");
    component.update();
    expect(component.state().totalChecked).toBe(2);
  });

  it("Checkbox group - 4 checkboxes, 0 checked with 1 checked from creation", function() {
    const component = mount(
      <CheckboxGroupCore title={"CheckboxGroup test"}>
        <CheckboxCore name={"1"} />
        <CheckboxCore name={"2"} />
        <CheckboxCore name={"3"} />
        <CheckboxCore name={"4"} />
      </CheckboxGroupCore>
    );

    component
      .childAt(0)
      .childAt(0)
      .simulate("click");

    expect(component.state().totalChecked).toBe(0);
  });

  it("Checkbox group - 4 checkboxes, 3 checked", function() {
    const component = mount(
      <CheckboxGroupCore title={"CheckboxGroup test"}>
        <CheckboxCore name={"1"} />
        <CheckboxCore name={"2"} />
        <CheckboxCore name={"3"} />
        <CheckboxCore name={"4"} />
      </CheckboxGroupCore>
    );

    component
      .childAt(0)
      .childAt(1)
      .simulate("click");
    component
      .childAt(0)
      .childAt(2)
      .simulate("click");
    component
      .childAt(0)
      .childAt(3)
      .simulate("click");
    component.update();
    expect(component.state().totalChecked).toBe(3);
  });

  it("Checkbox group - 4 checkboxes, 2 checked", function() {
    const component = mount(
      <CheckboxGroupCore title={"CheckboxGroup test"}>
        <CheckboxCore name={"1"} />
        <CheckboxCore name={"2"} />
        <CheckboxCore name={"3"} />
        <CheckboxCore name={"4"} />
      </CheckboxGroupCore>
    );

    component
      .childAt(0)
      .childAt(1)
      .simulate("click");
    component
      .childAt(0)
      .childAt(2)
      .simulate("click");
    component
      .childAt(0)
      .childAt(3)
      .simulate("click");
    component.update();
    expect(component.state().totalChecked).toBe(3);

    component
      .childAt(0)
      .childAt(1)
      .simulate("click");
    component.update();
    expect(component.state().totalChecked).toBe(2);
  });
});

function _verifyMinMax(mi, ma, numberOfClicks, message, expectedResult) {
  const component = mount(
    <CheckboxGroupCore title={"CheckboxGroup test"} min={mi} max={ma}>
      <CheckboxCore name={"1"} />
      <CheckboxCore name={"2"} />
      <CheckboxCore name={"3"} />
      <CheckboxCore name={"4"} />
      <CheckboxCore name={"5"} />
    </CheckboxGroupCore>
  );
  if (message != "") {
    component.limitMessage = message;
  }
  for (let i = 1; i <= numberOfClicks; i++) {
    component
      .childAt(0)
      .childAt(i)
      .simulate("click");
  }
  component.update();
  expect(component.state().groupError).toBe(expectedResult);
}

describe("Test CheckboxGroup component - Min/Max tests", () => {
  it("Checkbox group - 5 checkboxes, max=4, min=2, 1 checked", function() {
    _verifyMinMax(2, 4, 1, "Limit exceed!!", true);
  });
  it("Checkbox group - 5 checkboxes, max=4, min=2, 2 checked", function() {
    _verifyMinMax(2, 4, 2, "Limit exceed!!", false);
  });
  it("Checkbox group - 5 checkboxes, max=4, min=2, 3 checked", function() {
    _verifyMinMax(2, 4, 3, "Limit exceed!!", false);
  });
  it("Checkbox group - 5 checkboxes, max=4, min=2, 4 checked", function() {
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
      <CheckboxGroupCore
        title={"CheckboxGroup test"}
        max={4}
        min={2}
        limitMessage={"Limit exceed!!"}
      >
        <CheckboxCore name={"1"} />
        <CheckboxCore name={"2"} />
        <CheckboxCore name={"3"} />
        <CheckboxCore name={"4"} />
        <CheckboxCore name={"5"} />
      </CheckboxGroupCore>
    );

    for (let i = 1; i <= 5; i++) {
      component
        .childAt(0)
        .childAt(i)
        .simulate("click");
    }
    component.update();
    expect(component.state().groupError).toBe(true);

    component
      .childAt(0)
      .childAt(2)
      .simulate("click");
    component
      .childAt(0)
      .childAt(0)
      .simulate("click");
    component.update();
    expect(component.state().groupError).toBe(false);
  });
});
