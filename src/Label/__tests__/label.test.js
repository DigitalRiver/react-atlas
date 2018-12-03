import React from "react";
import { mount } from "enzyme";
import { Label } from "../index";
import renderer from "react-test-renderer";

describe("Test Label component", () => {
  it("Test render correctly", () => {
    const comp = <Label htmlFor="someField" label="Some Field:" required />;
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("htmlFor renders for attribute", () => {
    const label = mount(<Label htmlFor="someField" label="Some Field:" />);

    expect(label.props().htmlFor).toBe("someField");
    expect(
      label
        .find("label")
        .find('[htmlFor="someField"]')
        .exists()
    ).toBe(true);
  });

  it("inline && leftLabel renders with inline css classes", () => {
    const label = mount(
      <Label htmlFor="someField" label="Some Field:" inline leftLabel />
    );

    expect(label.find(".inline").exists()).toBe(true);
  });

  it("renders label text", () => {
    const label = mount(
      <Label htmlFor="someField" label="Some Field:" inline />
    );

    expect(label.find("label").text()).toEqual("Some Field:");
  });

  it("leftLabel omits unneeded css classes", () => {
    const label = mount(
      <Label htmlFor="someField" label="Some Field:" leftLabel />
    );

    expect(label.find(".labelSpacing").exists()).toBe(false);
    expect(label.find(".verticalPadding").exists()).toBe(false);
  });

  it("renders * by default for required", () => {
    const label = mount(
      <Label htmlFor="someField" label="Some Field:" required />
    );

    expect(label.find(".required").html()).toContain("*");
  });

  it("renders text if supplied for required", () => {
    const label = mount(
      <Label
        htmlFor="someField"
        label="Some Field:"
        required="this field is required"
      />
    );

    expect(label.find(".required").html()).toContain("this field is required");
  });

  it("renders text if supplied for required", () => {
    const label = mount(
      <Label
        htmlFor="someField"
        label="Some Field:"
        required="this field is required"
      />
    );

    expect(label.find(".required").html()).toContain("this field is required");
  });

  it("applies error css class if status is error and required is true", () => {
    const label = mount(
      <Label htmlFor="someField" label="Some Field:" status="error" required />
    );

    expect(label.find(".required_error").exists()).toBe(true);
  });
});
