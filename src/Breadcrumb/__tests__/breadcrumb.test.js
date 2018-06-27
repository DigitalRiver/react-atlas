import React from "react";
import { mount } from "enzyme";
import { Breadcrumb } from "../index";
import { BreadcrumbItem } from "../../BreadcrumbItem/index";
import { Text } from "../../Text/index";

import renderer from "react-test-renderer";

describe("Test Breadcrumb component", () => {
  it("Test correct render", function() {
    const tree = renderer
      .create(
        <Breadcrumb>
          <BreadcrumbItem>
            <Text as="a" href="#">
              Atlas
            </Text>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Text as="a" href="#breadcrumb">
              Breadcrumb
            </Text>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <Text>Breadcrumb Example</Text>
          </BreadcrumbItem>
        </Breadcrumb>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing Breadcrumb component: Basic Tests", () => {
  const brdcrmb = mount(
    <Breadcrumb>
      <BreadcrumbItem>
        <Text as="a" href="#">
          Atlas
        </Text>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Text as="a" href="#breadcrumb">
          Breadcrumb
        </Text>
      </BreadcrumbItem>
      <BreadcrumbItem active>
        <Text>Breadcrumb Example</Text>
      </BreadcrumbItem>
    </Breadcrumb>
  );

  it("Basic Breadcrumb", () => {
    expect(brdcrmb.exists(<Breadcrumb />)).toBe(true);
  });

  it("Contains No Child", () => {
    const breadcrumb = mount(<Breadcrumb />);

    expect(breadcrumb.props().children).toBeUndefined();
  });

  it("Contains Child", () => {
    expect(brdcrmb.props()).toHaveProperty("children");
  });

  it("Basic Breadcrumb with BreadcrumbItem child", () => {
    expect(
      brdcrmb.contains(
        <BreadcrumbItem>
          <Text as="a" href="#">
            Atlas
          </Text>
        </BreadcrumbItem>
      )
    ).toBeTruthy();
  });
});
