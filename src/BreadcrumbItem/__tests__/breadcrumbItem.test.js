import React from "react";
import { mount } from "enzyme";
import { BreadcrumbItem } from "../index";
import { Text } from "../../Text/index";

import renderer from "react-test-renderer";

describe("Test BreadcrumbItem component", () => {
  it("Test correct render", function() {
    const tree = renderer
      .create(
        <BreadcrumbItem>
          <Text as="a" href="#">
            Atlas
          </Text>
        </BreadcrumbItem>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing BreadcrumbItem component: Basic Tests", () => {
  const brdcrmbItm = mount(
    <BreadcrumbItem>
      <Text as="a" href="#">
        Atlas
      </Text>
    </BreadcrumbItem>
  );

  it("Basic BreadcrumbItem", () => {
    expect(brdcrmbItm.exists(<BreadcrumbItem />)).toBe(true);
  });

  it("Contains No Child", () => {
    const breadcrumbitem = mount(<BreadcrumbItem />);

    expect(breadcrumbitem.props().children).toBeUndefined();
  });

  it("Contains Child", () => {
    expect(brdcrmbItm.props()).toHaveProperty("children");
  });
});
