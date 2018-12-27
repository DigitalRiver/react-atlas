import React from "react";
import { mount } from "enzyme";
import { TextField } from "../index";

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
          disabled="false"
          hidden={false}
          maxLength={15}
          placeholder={"Text here"}
          valid={() => {
            return { status: null, message: null };
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
            return { status: "success", message: null };
          }
        }
        return { status: "error", message: "That is NOT a number" };
      }}
    />
  );

  expect(component.state().status).toEqual(null);
  component.setState({ value: input });
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

describe("Suite - events", () => {
  it("change updates value to uppercase if uppercase prop is true", () => {
    const tf = mount(<TextField label="name" uppercase />);

    tf.find("input").simulate("change", { target: { value: "Jon" } });
    expect(tf.state().value).toBe("JON");
  });

  it("change calls onChange function if present", () => {
    const handleChange = jest.fn();
    const tf = mount(<TextField label="name" onChange={handleChange} />);

    tf.find("input").simulate("change", { target: { value: "Jon" } });
    expect(handleChange).toBeCalled();
  });

  it("focus calls onFocus if onFocus is a function", () => {
    const handleFocus = jest.fn();
    const tf = mount(<TextField label="name" onFocus={handleFocus} />);

    tf.find("input").simulate("focus");
    expect(handleFocus).toBeCalled();
  });

  it("handle paste with no mask", () => {
    const event = {
      preventDefault: jest.fn(),
      clipboardData: {
        getData: jest.fn().mockImplementation(() => {
          return "02";
        })
      }
    };
    const tf = mount(<TextField label="Expiration Date" value="0" />);
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance()._handleChange = jest.fn();
    window.setTimeout = jest.fn();

    tf.find("input").simulate("paste", event);
    expect(tf.instance()._updateMaskSelection).not.toBeCalled();
    expect(tf.instance()._handleChange).not.toBeCalled();
    expect(window.setTimeout).not.toBeCalled();
  });

  it("handle key press with no mask", () => {
    const event = {
      preventDefault: jest.fn(),
      key: "1"
    };
    const tf = mount(<TextField label="Expiration Date" value="02" />);
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance()._handleChange = jest.fn();

    tf.find("input").simulate("keypress", event);
    expect(tf.instance()._updateMaskSelection).not.toBeCalled();
    expect(tf.instance()._handleChange).not.toBeCalled();
  });
});

describe("Suite - Mask", () => {
  it("updates value from mask.getValue", () => {
    const tf = mount(
      <TextField label="Expiration Date" value="04" mask="11/1111" />
    );
    expect(tf.state().value).toBe("04/____");
  });

  it("CWRP updates value from mask.getValue", () => {
    const tf = mount(
      <TextField label="Expiration Date" value="02" mask="11/1111" />
    );
    tf.setProps({ value: "04" });
    expect(tf.state().value).toBe("04/____");
  });

  it("CWRP sets mask pattern if mask is updated", () => {
    const tf = mount(
      <TextField label="Expiration Date" value="02" mask="11/1111" />
    );
    tf.instance().mask.setPattern = jest.fn();
    tf.setProps({ value: "04", mask: "11/11" });
    expect(tf.instance().mask.setPattern).toBeCalled();
  });

  it("handle change does not update mask selection if mask value equals value", () => {
    const tf = mount(
      <TextField label="Expiration Date" value="02" mask="11/1111" />
    );
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance().mask.getValue = jest.fn().mockImplementation(() => {
      return "04/2019";
    });

    tf.find("input").simulate("change", { target: { value: "04/2019" } });
    expect(tf.instance()._updateMaskSelection).not.toBeCalled();
  });

  it("handle change updates mask selection if mask value does not equal value", () => {
    const tf = mount(
      <TextField label="Expiration Date" value="02" mask="11/1111" />
    );
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance().mask.backspace = jest.fn();

    tf.find("input").simulate("change", { target: { value: "04" } });
    expect(tf.instance()._updateMaskSelection).toBeCalled();
    expect(tf.instance().mask.backspace).toBeCalled();
  });

  it("handle change only updates mask once when !newValue", () => {
    const tf = mount(
      <TextField label="Expiration Date" value="02" mask="11/1111" />
    );
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance()._getMaskDisplayValue = jest.fn().mockImplementation(() => {
      return false;
    });
    tf.instance().mask.backspace = jest.fn();

    tf.find("input").simulate("change", { target: { value: "04" } });
    expect(tf.instance()._updateMaskSelection.mock.calls.length).toBe(1);
    expect(tf.instance().mask.backspace).toBeCalled();
  });

  it("handle change updates mask selection if mask value does not equal value && value greater than maskValue length", () => {
    const tf = mount(
      <TextField label="Expiration Date" value="02" mask="11/1111" />
    );
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance().mask.backspace = jest.fn();
    tf.instance().mask.getValue = jest.fn().mockImplementation(() => {
      return 1;
    });

    tf.find("input").simulate("change", { target: { value: "04" } });
    expect(tf.instance()._updateMaskSelection).toBeCalled();
    expect(tf.instance().mask.backspace).not.toBeCalled();
  });

  it("handle key press updates mask selection if key is not meta/alt/ctrl/enter", () => {
    const event = {
      preventDefault: jest.fn(),
      key: "0"
    };
    const tf = mount(
      <TextField label="Expiration Date" value="02" mask="11/1111" />
    );
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance().mask.backspace = jest.fn();
    tf.instance()._handleChange = jest.fn();

    tf.find("input").simulate("keypress", event);
    expect(tf.instance()._updateMaskSelection).toBeCalled();
    expect(event.preventDefault).toBeCalled();
    expect(tf.instance()._handleChange).toBeCalled();
  });

  it("handle key press with Enter key", () => {
    const event = {
      preventDefault: jest.fn(),
      key: "Enter"
    };
    const tf = mount(
      <TextField label="Expiration Date" value="02" mask="11/1111" />
    );
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance().mask.backspace = jest.fn();
    tf.instance()._handleChange = jest.fn();

    tf.find("input").simulate("keypress", event);
    expect(tf.instance()._updateMaskSelection).not.toBeCalled();
    expect(event.preventDefault).not.toBeCalled();
    expect(tf.instance()._handleChange).not.toBeCalled();
  });

  it("handle key press with event data", () => {
    const event = {
      preventDefault: jest.fn(),
      data: "1"
    };
    const tf = mount(
      <TextField label="Expiration Date" value="02" mask="11/1111" />
    );
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance().mask.input = jest.fn().mockImplementation(() => {
      return true;
    });
    tf.instance()._handleChange = jest.fn();

    tf.find("input").simulate("keypress", event);
    expect(tf.instance()._updateMaskSelection).toBeCalled();
    expect(event.preventDefault).toBeCalled();
    expect(tf.instance()._handleChange).toBeCalled();
  });

  it("handle key press when mask input returns false", () => {
    const event = {
      preventDefault: jest.fn(),
      data: "1"
    };
    const tf = mount(
      <TextField label="Expiration Date" value="02" mask="11/1111" />
    );
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance().mask.input = jest.fn().mockImplementation(() => {
      return false;
    });
    tf.instance()._handleChange = jest.fn();

    tf.find("input").simulate("keypress", event);
    expect(tf.instance()._handleChange).not.toBeCalled();
  });

  it("handle key down updates mask on backspace", () => {
    const event = {
      preventDefault: jest.fn(),
      key: "Backspace"
    };
    const tf = mount(
      <TextField label="Expiration Date" value="02" mask="11/1111" />
    );
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance().mask.backspace = jest.fn().mockImplementation(() => {
      return true;
    });
    tf.instance()._handleChange = jest.fn();

    tf.find("input").simulate("keyDown", event);
    expect(tf.instance()._updateMaskSelection).toBeCalled();
    expect(event.preventDefault).toBeCalled();
    expect(tf.instance()._handleChange).toBeCalled();
  });

  it("handle key down updates mask on backspace", () => {
    const event = {
      preventDefault: jest.fn(),
      key: "Backspace"
    };
    const tf = mount(
      <TextField label="Expiration Date" value="02" mask="11/1111" />
    );
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance().mask.backspace = jest.fn().mockImplementation(() => {
      return true;
    });
    tf.instance()._handleChange = jest.fn();
    tf.instance()._getMaskDisplayValue = jest.fn().mockImplementation(() => {
      return false;
    });

    tf.find("input").simulate("keyDown", event);
    expect(tf.instance()._updateMaskSelection.mock.calls.length).toBe(1);
    expect(event.preventDefault).toBeCalled();
    expect(tf.instance()._handleChange).toBeCalled();
  });

  it("handle key down when mask.backspace returns false", () => {
    const event = {
      preventDefault: jest.fn(),
      key: "Backspace"
    };
    const tf = mount(
      <TextField label="Expiration Date" value="02" mask="11/1111" />
    );
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance().mask.backspace = jest.fn().mockImplementation(() => {
      return false;
    });
    tf.instance()._handleChange = jest.fn();

    tf.find("input").simulate("keyDown", event);
    expect(tf.instance()._updateMaskSelection.mock.calls.length).toBe(1);
    expect(event.preventDefault).toBeCalled();
    expect(tf.instance()._handleChange).toBeCalled();
  });

  it("handle key down not backspace", () => {
    const event = {
      preventDefault: jest.fn(),
      key: "01"
    };
    const tf = mount(
      <TextField label="Expiration Date" value="02" mask="11/1111" />
    );
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance()._handleChange = jest.fn();

    tf.find("input").simulate("keyDown", event);
    expect(tf.instance()._updateMaskSelection).not.toBeCalled();
    expect(event.preventDefault).not.toBeCalled();
    expect(tf.instance()._handleChange).not.toBeCalled();
  });

  it("handle paste with mask", () => {
    const event = {
      preventDefault: jest.fn(),
      clipboardData: {
        getData: jest.fn().mockImplementation(() => {
          return "02";
        })
      }
    };
    const tf = mount(
      <TextField label="Expiration Date" value="0" mask="11/1111" />
    );
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance()._handleChange = jest.fn();

    tf.find("input").simulate("paste", event);
    expect(tf.instance()._updateMaskSelection).toBeCalled();
    expect(event.preventDefault).toBeCalled();
    expect(tf.instance()._handleChange).toBeCalled();
  });

  it("handle paste with mask when mask.paste returns false", () => {
    const event = {
      preventDefault: jest.fn(),
      clipboardData: {
        getData: jest.fn().mockImplementation(() => {
          return "02";
        })
      }
    };
    const tf = mount(
      <TextField label="Expiration Date" value="0" mask="11/1111" />
    );
    tf.instance()._updateMaskSelection = jest.fn();
    tf.instance().mask.paste = jest.fn().mockImplementation(() => {
      return false;
    });
    tf.instance()._handleChange = jest.fn();
    window.setTimeout = jest.fn();

    tf.find("input").simulate("paste", event);
    expect(tf.instance()._updateMaskSelection).toBeCalled();
    expect(event.preventDefault).toBeCalled();
    expect(tf.instance()._handleChange).toBeCalled();
    expect(window.setTimeout).not.toBeCalled();
  });
});
