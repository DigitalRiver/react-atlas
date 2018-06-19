import React from "react";
import { mount } from "enzyme";
import { Card } from "../index";
import { Checkbox } from "../../Checkbox/Checkbox";
import { CheckboxGroup } from "../../CheckboxGroup/CheckboxGroup";
import { verifyPropsDefaultValue } from "../../utils/propsVerification";

import renderer from "react-test-renderer";

describe("Test Card component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Card className={"name"} legend={"lalala"} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test Card component: Basic Tests", () => {
  let cardComponent = null;

  it("Card - Basic properties test", function() {
    cardComponent = mount(<Card className={"name"} legend={"lalala"} />);
    const expected = new Map([["className", "name"], ["legend", "lalala"]]);
    expect(verifyPropsDefaultValue(cardComponent, expected)).toEqual(true);
  });

  it("Basic Accordion", () => {
    expect(
      cardComponent.exists(
        <Card>
          <div>Child</div>
        </Card>
      )
    ).toBe(true);
  });

  it("Contains No Child", () => {
    cardComponent = mount(<Card />);
    expect(cardComponent.props().children).toBeUndefined();
  });

  it("Card - Children test", function() {
    cardComponent = mount(
      <Card className={"name"} legend={"lalala"}>
        <div>Card Test</div>
      </Card>
    );
    expect(cardComponent.props()).toHaveProperty("children");
  });

  it("Test Standard Fieldset", function() {
    cardComponent = mount(
      <Card legend="Fieldset Example" standardFieldset>
        <CheckboxGroup title="Checkbox Group" name="checkboxGroup">
          <Checkbox label="Checkbox 1" checked />
          <Checkbox label="Checkbox 2" />
          <Checkbox label="Checkbox 3" />
        </CheckboxGroup>
      </Card>
    );
    expect(cardComponent.props().standardFieldset).toBe(true);
  });

  it("Card - Image prop test", function() {
    cardComponent = mount(
      <Card image="https://static1.squarespace.com/static/5369465be4b0507a1fd05af0/5397d14be4b06a5454f5633c/5397d15ae4b06a5454f56351/1404441173879/neo_001126-02.jpg?format=1500w" />
    );
    expect(cardComponent.props().image).toBe(
      "https://static1.squarespace.com/static/5369465be4b0507a1fd05af0/5397d14be4b06a5454f5633c/5397d15ae4b06a5454f56351/1404441173879/neo_001126-02.jpg?format=1500w"
    );
  });

  it("Test Title prop", () => {
    cardComponent = mount(<Card title="first">first</Card>);
    expect(cardComponent.props().title).toBe("first");
  });
});
