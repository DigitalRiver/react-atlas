import React from "react";
import { mount } from "enzyme";
import Form from "../index";
import TextField from "../../TextField";

describe("Test data", () => {
  it("Test submit data", function() {
    const onSubmit = jest.fn();
    const form = mount(
      <Form onSubmit={onSubmit}>
        <TextField name="UserField" value="Userdata" />
      </Form>
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
      <Form onSubmit={onSubmit}>
        <TextField name="UserField" value="Userdata" />
        <TextField name="UserField2" value="Userdata2" />
      </Form>
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
      <Form onSubmit={onSubmit}>
        <TextField name="UserField" value="Userdata" />
        <div>
          <TextField name="NestedField" value="Userdata" />
        </div>
      </Form>
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
      <Form onSubmit={onSubmit}>
        <div>
          <TextField name="NestedField" value="Userdata" />
        </div>
      </Form>
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
      <Form onSubmit={() => {}}>
        <div>
          <TextField name="NestedField" value="Userdata" onChange={onChange} />
        </div>
      </Form>
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
      <Form onSubmit={onSubmit}>
        <div>
          <TextField name="NestedField" value="Userdata" />
        </div>
      </Form>
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
      <Form onSubmit={() => {}} onError={onError}>
        <TextField name="UserField" value="Userdata" />
        <div>
          <TextField name="InvalidField" required value="" />
        </div>
      </Form>
    );
    form.simulate("submit");

    expect(onError).toBeCalled();
  });

  it("Test that required validation updates state properly", function() {
    const onError = jest.fn();
    const form = mount(
      <Form onSubmit={() => {}} onError={onError}>
        <TextField name="UserField" value="Userdata" />
        <div>
          <TextField name="InvalidField" required value="" />
        </div>
      </Form>
    );
    expect(form.state().childState.InvalidField.isValid).toBeTruthy();
    form.simulate("submit");

    expect(form.state().childState.InvalidField.isValid).toEqual(false);
  });

  // regression for https://github.com/DigitalRiver/react-atlas/issues/671
  it("Verify state is not lost on submission", function() {
    const form = mount(
      <Form>
        <TextField name="FieldOne" />
        <TextField name="FieldTwo" />
      </Form>
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
    const children = form.prop("children").concat(<TextField />);
    form.setProps({ children });

    expect(form.state().childState.FieldOne.value).toEqual("data one");
    expect(form.state().childState.FieldTwo.value).toEqual("data two");
  });
});
