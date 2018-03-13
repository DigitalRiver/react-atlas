import React from "react";
import { mount } from "enzyme";
import { InputCore } from "../../../react-atlas-core/src/Input/index";

import { verifyPropsDefaultValue } from "../../utils/propsVerification";

import renderer from "react-test-renderer";

describe("Test Input component render", () => {
  it("Render correctly", () => {
    const tree = renderer
      .create(
        <InputCore
          isValid={true}
          className={"class"}
          type={"text"}
          id={"ID"}
          name={"InputName"}
          required={false}
          requiredText={false}
          errorText={"Error occured"}
          errorLocation={"location"}
          value={"Value"}
          disabled={false}
          hidden={false}
          checked={false}
          maxLength={15}
          placeholder={"Text here"}
          multiline={false}
          small={true}
          medium={false}
          large={false}
          mask={""}
          validator={() => {
            return true;
          }}
          onBeforeChange={() => {
            return true;
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

describe("Blank test", () => {
  it("blank test", () => {
    const component = mount(<InputCore type="email" />);
  });
});

function _validate(input, positiveCase) {
  const component = mount(
    <InputCore
      validator={function() {
        if (!isNaN(component.state().value)) {
          if (parseInt(component.state().value) > 0) {
            return true;
          }
        }
        return false;
      }}
      errorText={"That is NOT a number"}
    />
  );

  expect(component.state().isValid).toEqual(true);
  component.setState({ value: input });
  component.find("input").simulate("change");
  if (positiveCase) {
    expect(component.state().isValid).toEqual(true);
  } else {
    expect(component.state().errorText).toEqual("That is NOT a number");
    expect(component.state().isValid).toEqual(false);
  }
}

function _pressOneByOne(comp, str) {
  for (var i in str) {
    comp.find("input").simulate("keyPress", { key: str[i] });
  }
}

function _validateMask(msk, inputText, expText) {
  const component = mount(<InputCore mask={msk} />);

  expect(component.state().value).toEqual("");
  _pressOneByOne(component, inputText);
  component.find("input").simulate("keyPress", { key: "enter" });
  expect(component.state().value).toEqual(expText);
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

  it("Check validator use - unproper validator", function() {
    let myTrackedMessage;
    let originalConsole = console.warn;
    console.warn = function(msg) {
      myTrackedMessage = msg;
      originalConsole("<<" + msg + ">>");
    };
    const component = mount(
      <InputCore
        validator={function() {
          return false;
        }}
      />
    );
    expect(myTrackedMessage).toEqual(
      "You set a custom validator without error text message. Please use 'errorText' property to set it up."
    );
    console.warn = originalConsole;
  });
});

describe("Check mask behavior ", () => {
  it("Date 1", function() {
    _validateMask("11-11-1111", "10081974sd", "10-08-1974");
  });
  it("Date 2", function() {
    _validateMask("11/11/1111", "1s0081J974", "10/08/1974");
  });
  it("Date 3", function() {
    _validateMask("11 11 1111", "1s0081\\9 74", "10 08 1974");
  });

  it("Credit card 1", function() {
    _validateMask(
      "1111 1111 1111 1111",
      "4519348134566546",
      "4519 3481 3456 6546"
    );
  });
  it("Credit card 2", function() {
    _validateMask(
      "1111 1111 1111 1111",
      "4519s3g4j813j456f6546",
      "4519 3481 3456 6546"
    );
  });
  it("Credit card 3", function() {
    _validateMask(
      "1111 1111 1111 1111",
      "4519 3481 3456 6546",
      "4519 3481 3456 6546"
    );
  });

  it("Time 1", function() {
    _validateMask("11:11", "1234", "12:34");
  });
  it("Time 2", function() {
    _validateMask("11:11", "1234", "12:34");
  });
  it("Time 3", function() {
    _validateMask("11:11:11", "123", "12:3_:__");
  });
  it("Time 4", function() {
    _validateMask("11:11:11", "", "");
  });
  it("Time 5", function() {
    _validateMask("11:11:11", "123h4345k345", "12:34:34");
  });

  it("Name 1", function() {
    _validateMask("Aaaaaa", "adrian", "Adrian");
  });
  it("Name 2", function() {
    _validateMask("Aaaaaa", "driAn", "DriAn_");
  });
  it("Name 3", function() {
    _validateMask("Aaaaaa", "__adrIan", "AdrIan");
  });

  it("Backspace key test 1", function() {
    let comp = mount(<InputCore mask={"Aaaaaa"} />);

    expect(comp.state().value).toEqual("");

    _pressOneByOne(comp, "Adrii");
    comp.find("input").simulate("keyDown", { key: "Backspace" });
    comp.find("input").simulate("keyPress", { key: "i" });
    comp.find("input").simulate("keyDown", { key: "Backspace" });
    _pressOneByOne(comp, "an");

    expect(comp.state().value).toEqual("Adrian");
  });

  it("Backspace key test 2", function() {
    let comp = mount(<InputCore mask={"Aaaaaa"} />);

    expect(comp.state().value).toEqual("");

    _pressOneByOne(comp, "a");
    comp.find("input").simulate("keyDown", { key: "Backspace" });
    _pressOneByOne(comp, "Adriaaa");
    comp.find("input").simulate("keyDown", { key: "Backspace" });
    _pressOneByOne(comp, "n");

    expect(comp.state().value).toEqual("Adrian");
  });

  it("Control & Enter keys test", function() {
    let comp = mount(<InputCore mask={"Aaaaaa"} />);

    comp.find("input").simulate("keyPress", { key: "Ctrl" });

    comp.find("input").simulate("keyPress", { key: "Enter" });
  });
});

describe("Suite - Basic functionality", () => {
  it("Check default props", function() {
    const expectedProps = new Map([
      ["className", ""],
      ["disabled", false],
      ["hidden", false],
      ["errorLocation", "right"]
    ]);
    const component = mount(<InputCore />);

    expect(verifyPropsDefaultValue(component, expectedProps)).toEqual(true);
  });

  it("Simulate text entered", function() {
    const component = mount(
      <InputCore
        onChange={function() {
          component.state().isValid = false;
        }}
      />
    );

    expect(component.state().isValid).toEqual(true);

    component
      .find("input")
      .simulate("change", { target: { value: "1234567890!!!" } });

    expect(component.state().isValid).toEqual(false);

    expect(component.state().value).toEqual("1234567890!!!");
  });

  it("Simulate text entered(keypressed)", function() {
    const component = mount(<InputCore />);

    _pressOneByOne(component, "Text");
  });

  it("Backspace test last", function() {
    let comp = mount(<InputCore />);

    _pressOneByOne(comp, "Adrii");
    comp.find("input").simulate("keyDown", { key: "Backspace" });
    comp.find("input").simulate("keyDown", { key: "Backspace" });
  });
});

describe("Suite - Max length limit", () => {
  it("Check text max-size - Text entered lower than maxsize", function() {
    const component = mount(<InputCore maxLength={5} />);

    component.find("input").simulate("change", { target: { value: "1234" } });
    expect(component.state().value).toEqual("1234");
    expect(component.state().remaining).toEqual(1);
  });

  it("Check text max-size - Text entered equal to maxsize", function() {
    const component = mount(<InputCore maxLength={5} />);

    component.find("input").simulate("change", { target: { value: "12345" } });
    expect(component.state().value).toEqual("12345");
    expect(component.state().remaining).toEqual(0);
  });

  it("Check text max-size - Text entered greater than maxsize", function() {
    const component = mount(<InputCore maxLength={5} />);

    component
      .find("input")
      .simulate("change", { target: { value: "123456789!" } });
    expect(component.state().value).toEqual("12345");
    expect(component.state().remaining).toEqual(0);
  });
});

describe("Suite - Required field", () => {
  it("Check behavior when field is set to required - Negative case", () => {
    const component = mount(<InputCore required={true} />);

    component.find("input").simulate("change", { target: { value: "" } });
    expect(component.state().isValid).toEqual(false);
    expect(component.state().errorText).toEqual("This field is required.");
  });

  it("Check behavior when field is set to required - Positive case", () => {
    const component = mount(<InputCore required={true} />);

    component
      .find("input")
      .simulate("change", { target: { value: "Some text." } });
    expect(component.state().isValid).toEqual(true);
  });

  it("Check behavior when field is set to not required", () => {
    const component = mount(<InputCore required={false} />);

    component.find("input").simulate("change", { target: { value: "" } });
    expect(component.state().isValid).toEqual(true);
  });

  it("Check behavior when field is set to required and validated - Positive case", () => {
    const component = mount(
      <InputCore
        required={true}
        validator={function() {
          return true;
        }}
        errorText={"That is NOT a number"}
      />
    );

    component
      .find("input")
      .simulate("change", { target: { value: "Some text." } });
    expect(component.state().isValid).toEqual(true);
  });

  it("Check behavior when field is set to required and validated - Negative case", () => {
    const component = mount(
      <InputCore
        required={true}
        validator={function() {
          return false;
        }}
        errorText={"That is NOT a number"}
      />
    );

    component
      .find("input")
      .simulate("change", { target: { value: "Some text." } });
    expect(component.state().errorText).toEqual("That is NOT a number");
    expect(component.state().isValid).toEqual(false);
  });
});

describe("Suite - checkbox", () => {
  it("Check box - base case ", () => {
    const expectedProps = new Map([
      ["label", ""],
      ["className", ""],
      ["disabled", false],
      ["inline", false],
      ["title", ""],
      ["defaultChecked", false]
    ]);
    const component = mount(<InputCore type="checkbox" />);
  });
});

describe("Suite - radio", () => {
  it("Check radio - base base", () => {
    const component = mount(<InputCore type="radio" />);
  });
});

describe("Suite - password", () => {
  it("Check password - base case", () => {
    const component = mount(<InputCore type="password" />);
  });
});

describe("Suite - email", () => {
  it("Check email", () => {
    const component = mount(<InputCore type="email" />);
  });
});
