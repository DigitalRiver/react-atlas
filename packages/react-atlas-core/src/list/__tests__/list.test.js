import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import { ListCore, ListItemCore, ListTextCore } from "../../index";

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
