import React from "react";
import { mount } from "enzyme";
import { ListCore, ListItemCore, ListTextCore } from "react-atlas-core";

describe("Test List component", () => {
  it("Test default props", function() {
    const result = mount(
      <ListCore>
        <ListItemCore>
          <ListTextCore>
            Some Guy
          </ListTextCore>
        </ListItemCore>
      </ListCore>
    );
  });
});
