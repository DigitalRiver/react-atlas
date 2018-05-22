import React from "react";
import { mount } from "enzyme";
import TextField from "../index";

import renderer from "react-test-renderer";

describe("Test Input component render", () => {
  it("Render correctly", () => {
    const tree = renderer
      .create(
        <TextField
          className={"class"}
          type={"text"}
          id={"ID"}
          name={"InputName"}
          required
          value={"Value"}
          disabled={false}
          hidden={false}
          maxLength={15}
          placeholder={"Text here"}
          valid={() => {
            return { "status": null, "message": null };
          }}
          onChange={() => {
            return true;
          }}
          uppercase={false}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

function _validate(input, positiveCase) {
  const component = mount(
    <TextField
      valid={function() {
        if (!isNaN(component.state().value)) {
          if (parseInt(component.state().value) > 0) {
            return { "status": "success", "message": null };
          }
        }
        return { "status": "error", "message": "That is NOT a number" };
      }}
    />
  );

  expect(component.state().status).toEqual(null);
  component.setState({ "value": input });
  component.find("input").simulate("change");
  if (positiveCase) {
    expect(component.state().status).toEqual("success");
  } else {
    expect(component.state().message).toEqual("That is NOT a number");
    expect(component.state().status).toEqual("error");
  }
}

describe("Suite - Validator checking", () => {
  it("Check validator use - Only number greater than zero allowed - Positive case ", function() {
    _validate("121", true);
  });
  it("Check validator use - Only number greater than zero allowed - Positive case ", function() {
    _validate("11", true);
  });
  it("Check validator use - Only number greater than zero allowed - Negative case ", function() {
    _validate("aa", false);
  });
  it("Check validator use - Only number greater than zero allowed - Negative case ", function() {
    _validate("1a1", false);
  });
  it("Check validator use - Only number greater than zero allowed - Negative case ", function() {
    _validate("-2", false);
  });
  it("Check validator use - Only number greater than zero allowed - Negative case ", function() {
    _validate("", false);
  });
});
