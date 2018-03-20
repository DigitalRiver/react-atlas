import React from "react";
import { BreadcrumbCore } from "../../../react-atlas-core/src/Breadcrumb/index";
import { BreadcrumbItemCore } from "../../../react-atlas-core/src/BreadcrumbItem/index";
import { TextCore } from "../../../react-atlas-core/src/Text/index";

import renderer from "react-test-renderer";

describe("Test correct render", () => {
  it("Test correct render", function() {
    const tree = renderer
      .create(
        <BreadcrumbCore>
          <BreadcrumbItemCore>
            <TextCore as="a" href="#">
              Atlas
            </TextCore>
          </BreadcrumbItemCore>
          <BreadcrumbItemCore>
            <TextCore as="a" href="#breadcrumb">
              Breadcrumb
            </TextCore>
          </BreadcrumbItemCore>
          <BreadcrumbItemCore active>
            <TextCore>Breadcrumb Example</TextCore>
          </BreadcrumbItemCore>
        </BreadcrumbCore>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
