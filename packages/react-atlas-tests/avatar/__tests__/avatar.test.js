import React from "react";
import { mount, shallow } from "enzyme";
import { AvatarCore } from "../../../react-atlas-core/src/Avatar/index";

import renderer from "react-test-renderer";

let title = "testTitle";
let image = "picture.jpg";
let icon = "fa fa-github";

describe("Test correct render", () => {
  it("Test correct render", function() {
    const tree = renderer
      .create(<AvatarCore title={title} image={image} icon={icon} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing Avatar component", () => {
  it("Set props should match what was passed in", function() {
    const result = mount(
      <AvatarCore title={title} image={image} icon={icon} />
    );
    expect(result.props().title).toBe(title);
    expect(result.props().image).toBe(image);
    expect(result.find("img").length).toBe(1);
    expect(result.props().icon).toBe(icon);
  });

  it("Avatar with one text", function() {
    const result = mount(<AvatarCore>AvatarText</AvatarCore>);
    expect(result.props().children).toBe("AvatarText");
  });

  it("If image is not set then state.image should be equal to defaultImage", function() {
    const result = mount(<AvatarCore defaultImage={image} />);
    expect(result.state().image).toBe(image);
  });

  it("If image and defaultImage are not set then state.image should be equal to null", function() {
    const result = mount(<AvatarCore />);
    expect(result.state().image).toBe(null);
  });

  it("If an image is not set and an icon is set then avatar should have the icon as a child.", function() {
    const result = shallow(<AvatarCore icon={icon} />);
    expect(result.state().image).toBe(null);
    expect(result.type()).toBe("div");
    expect(result.find("i").prop("className")).toBe(icon);
  });

  it("If image is set but fails to load fall back on the default image.", function() {
    const result = mount(
      <AvatarCore image={"incorrect.jpg"} defaultImage={image} />
    );
    let img = result.find("img");
    img.simulate("error");
    expect(result.state().image).toBe(image);
  });

  it("The avatar component should fall back on the title prop if image and defaultImage props are not set or fail to load.", function() {
    const result = mount(<AvatarCore image={image} title={title} />);
    let img = result.find("img");
    img.simulate("error");
    expect(result.state().image).toBe(null);
    let child = result.children().at(0);
    expect(child.text()).toBe(title[0]);
  });

  it("The avatar image should update if new props are received", function() {
    let img = image;
    const result = mount(<AvatarCore image={img} />);
    img = "newPicture.jpg";
    result.setProps({ "image": img });
    expect(result.state().image).toBe("newPicture.jpg");
  });

  it("The avatar image should update if new props are received and should handle bad image", function() {
    let img = image;
    const result = mount(<AvatarCore image={img} title={title} />);
    img = "newPicture.jpg";
    result.setProps({ "image": img });
    let imgEl = result.find("img");
    imgEl.simulate("error");
    expect(result.state().image).toBe(null);
    let child = result.children().at(0);
    expect(child.text()).toBe(title[0]);
  });
});
