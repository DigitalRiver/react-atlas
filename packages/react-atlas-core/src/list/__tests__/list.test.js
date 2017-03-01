import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import { List, ListItem, ListText } from "../../list";

describe("Test List component", () => {
  it("Test default props", function() {
    const result = mount(
      <List>
        <ListItem>
          <ListText>
            Some Guy
          </ListText>
        </ListItem>
      </List>
    );
    expect(result.props().className).to.equal("");
    expect(result.props().theme).to.contain({
      "list": true,
      "text": true
    });
  });
});
