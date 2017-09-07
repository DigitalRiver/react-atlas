import React from "react";
import { mount, shallow } from "enzyme";
import { default as Avatar } from "../../../react-atlas-core/src/Avatar/Avatar";

let title = "testTitle";
let image = "picture.jpg";
let icon = 'icon={<i className="fa fa-github"></i>}';

describe("Testing Avatar component", () => {
  it("Set props should match what was passed in", function() {
    const result = mount(<Avatar title={title} image={image} icon={icon} />);
    expect(result.props().title).toBe(title);
    expect(result.props().image).toBe(image);
    expect(result.find("img").length).toBe(1);
    expect(result.props().icon).toBe(icon);
  });

  it("If image is not set then state.image should be equal to defaultImage", function() {
    const result = mount(<Avatar defaultImage={image} />);
    expect(result.state().image).toBe(image);
  });

  it("If image and defaultImage are not set then state.image should be equal to null", function() {
    const result = mount(<Avatar />);
    expect(result.state().image).toBe(null);
  });

  it("If an image is not set and an icon is set then avatar should have the icon as a child.", function() {
    const result = shallow(<Avatar icon={icon} />);
    expect(result.state().image).toBe(null);
    expect(result.type()).toBe("div");
    expect(result.contains(icon)).toBe(true);
  });

  it("If image is set but fails to load fall back on the default image.", function() {
    const result = mount(
      <Avatar image={"incorrect.jpg"} defaultImage={image} />
    );
    let img = result.find("img");
    img.simulate("error");
    expect(result.state().image).toBe(image);
  });

  it("The avatar component should fall back on the title prop if image and defaultImage props are not set or fail to load.", function() {
    const result = mount(<Avatar image={image} title={title} />);
    let img = result.find("img");
    img.simulate("error");
    expect(result.state().image).toBe(null);
    let child = result.children().at(0);
    expect(child.text()).toBe(title[0]);
  });
});
