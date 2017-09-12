import React from "react";
import { mount } from "enzyme";
import { HintCore } from "../../../react-atlas-core/src/Hint/index";


describe("Test Hint component", () => {
	
  it("Test default props", function() {
    const result = mount(<HintCore text="Some text"/>);
  });
  
  it("Test default props", function() {
    const result = mount(<HintCore>
							"Some text"
						 </HintCore>
						);
  });

});
