import React from "react";
import { mount } from "enzyme";
import { FormCore } from "../../../react-atlas-core/src/Form/index";

describe("Test form component", () => {
  it("Test default props", function() {
    const result = mount(<FormCore >
							<span value="Adrian">Adrian</span>
						 </FormCore>
						);
  });
});
