import React from "react";
import { Breadcrumb } from "../index";
import { BreadcrumbItem } from "../../BreadcrumbItem/index";
import { Text } from "../../Text/index";

import renderer from "react-test-renderer";

describe("Test correct render", () => {
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
