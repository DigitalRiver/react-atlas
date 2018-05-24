import React from "react";
import { mount } from "enzyme";
import { FileUpload } from "../index";

/*
describe("Test correct render", () => {
  it("Test correct render", function() {
		const tree = renderer.create(<FileUpload text={'Upload zone'} accept={"application/pdf"} onChange={()=> console.log('onChange triggered') }/>).toJSON();
		expect(tree).toMatchSnapshot(); 
  });
});
*/

describe("Testing File Upload component", () => {
  it("File Upload - Simulate drop event", function() {
    const fileU = mount(
      <FileUpload
        text={"Upload zone"}
        onChange={function(files) {
          console.log("files: ", files);
        }}
      />
    );
    fileU.simulate("drop", ["/blahblah.pdf"]);
  });

  it("File Upload - Simulate drop event(withou onChange func)", function() {
    const fileU = mount(
      <FileUpload text={"Upload zone"} accept={"application/pdf"} />
    );
    fileU.simulate("drop");
  });
});
