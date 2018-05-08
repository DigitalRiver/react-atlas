import React from "react";
import { mount } from "enzyme";
import { FileUploadCore } from "../../../react-atlas-core/src/FileUpload/index";

import renderer from "react-test-renderer";
/*
describe("Test correct render", () => {
  it("Test correct render", function() {
		const tree = renderer.create(<FileUploadCore text={'Upload zone'} accept={"application/pdf"} onChange={()=> console.log('onChange triggered') }/>).toJSON();
		expect(tree).toMatchSnapshot(); 
  });
});
*/

describe("Testing File Upload component", () => {
  it("File Upload - Basic test", function() {
    const fileU = mount(<FileUploadCore />);
  });

  it("File Upload - Basic test(2)", function() {
    const fileU = mount(
      <FileUploadCore
        text={"Upload zone"}
        accept={"application/pdf"}
        onChange={() => console.log("onChange triggered")}
      />
    );
  });

  it("File Upload - Simulate drop event", function() {
    const fileU = mount(
      <FileUploadCore
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
      <FileUploadCore text={"Upload zone"} accept={"application/pdf"} />
    );
    fileU.simulate("drop");
  });
});
