import React from "react";
import { mount } from "enzyme";
import { FormCore } from "../../../react-atlas-core/src/Form/index";
import { TextFieldCore } from "../../../react-atlas-core/src/TextField";

describe("Test data", () => {
  it("Test submit data", function() {
    const onSubmit = jest.fn();
    const form = mount(
      <FormCore onSubmit={onSubmit}>
        <TextFieldCore name="UserField" value="Userdata" />
      </FormCore>
    );
    form.simulate("submit");

    expect(onSubmit).toBeCalled();

    expect(onSubmit.mock.calls[0][1]).toEqual({
      "UserField": "Userdata"
    });
  });

  it("Test submit data with multiple fields", function() {
    const onSubmit = jest.fn();
    const form = mount(
      <FormCore onSubmit={onSubmit}>
        <TextFieldCore name="UserField" value="Userdata" />
        <TextFieldCore name="UserField2" value="Userdata2" />
      </FormCore>
    );
    form.simulate("submit");

    expect(onSubmit).toBeCalled();

    expect(onSubmit.mock.calls[0][1]).toEqual({
      "UserField": "Userdata",
      "UserField2": "Userdata2"
    });
  });

  it("Test submit with nested fields", function() {
    const onSubmit = jest.fn();
    const form = mount(
      <FormCore onSubmit={onSubmit}>
        <TextFieldCore name="UserField" value="Userdata" />
        <div>
          <TextFieldCore name="NestedField" value="Userdata" />
        </div>
      </FormCore>
    );
    form.simulate("submit");

    expect(onSubmit).toBeCalled();

    expect(onSubmit.mock.calls[0][1]).toEqual(
      expect.objectContaining({
        "UserField": "Userdata",
        "NestedField": "Userdata"
      })
    );
  });

  it("Test submit with a nested field", function() {
    const onSubmit = jest.fn();
    const form = mount(
      <FormCore onSubmit={onSubmit}>
        <div>
          <TextFieldCore name="NestedField" value="Userdata" />
        </div>
      </FormCore>
    );
    form.simulate("submit");

    expect(onSubmit).toBeCalled();

    expect(onSubmit.mock.calls[0][1]).toEqual({
      "NestedField": "Userdata"
    });
  });

  it("Test that field onChange is called", function() {
    const onChange = jest.fn();
    const form = mount(
      <FormCore onSubmit={() => {}}>
        <div>
          <TextFieldCore
            name="NestedField"
            value="Userdata"
            onChange={onChange}
          />
        </div>
      </FormCore>
    );

    form
      .find("input")
      .at(0)
      .simulate("change", {
        "target": {
          "name": "NestedField",
          "value": "testdata"
        }
      });

    expect(onChange).toBeCalled();
  });

  it("Test onChangeHandler", function() {
    const onSubmit = jest.fn();
    const form = mount(
      <FormCore onSubmit={onSubmit}>
        <div>
          <TextFieldCore name="NestedField" value="Userdata" />
        </div>
      </FormCore>
    );
    form
      .find("input")
      .at(0)
      .simulate("change", {
        "target": {
          "name": "NestedField",
          "value": "testdata"
        }
      });
    form.simulate("submit");
    form.update();
    expect(onSubmit).toBeCalled();

    expect(onSubmit.mock.calls[0][1]).toEqual({
      "NestedField": "testdata"
    });
  });

  it("Test that onError is called when submitting an invalid field", function() {
    const onError = jest.fn();
    const form = mount(
      <FormCore onSubmit={() => {}} onError={onError}>
        <TextFieldCore name="UserField" value="Userdata" />
        <div>
          <TextFieldCore name="InvalidField" required value="" />
        </div>
      </FormCore>
    );
    form.simulate("submit");

    expect(onError).toBeCalled();
  });

  it("Test that required validation updates state properly", function() {
    const onError = jest.fn();
    const form = mount(
      <FormCore onSubmit={() => {}} onError={onError}>
        <TextFieldCore name="UserField" value="Userdata" />
        <div>
          <TextFieldCore name="InvalidField" required value="" />
        </div>
      </FormCore>
    );
    expect(form.state().childState.InvalidField.isValid).toBeTruthy();
    form.simulate("submit");

    expect(form.state().childState.InvalidField.isValid).toEqual(false);
  });

  // regression for https://github.com/DigitalRiver/react-atlas/issues/671
  it("Verify state is not lost on submission", function() {
    const form = mount(
      <FormCore>
        <TextFieldCore name="FieldOne" />
        <TextFieldCore name="FieldTwo" />
      </FormCore>
    );

    expect(form.state().childState.FieldOne.value).toBeUndefined();
    expect(form.state().childState.FieldTwo.value).toBeUndefined();

    form
      .find("input")
      .at(0)
      .simulate("change", {
        "target": {
          "name": "FieldOne",
          "value": "data one"
        }
      });

    form
      .find("input")
      .at(0)
      .simulate("change", {
        "target": {
          "name": "FieldTwo",
          "value": "data two"
        }
      });

    expect(form.state("childState").FieldOne.value).toEqual("data one");
    expect(form.state("childState").FieldTwo.value).toEqual("data two");
    expect(
      form
        .find("TextField")
        .at(0)
        .prop("name")
    ).toEqual("FieldOne");
    expect(
      form
        .find("TextField")
        .at(0)
        .prop("value")
    ).toEqual("data one");

    form.simulate("submit");
    const children = form.prop("children").concat(<TextFieldCore />);
    form.setProps({ children });

    expect(form.state().childState.FieldOne.value).toEqual("data one");
    expect(form.state().childState.FieldTwo.value).toEqual("data two");
  });
});
