import React from "react";
import { mount } from "enzyme";
import { DatePickerCore } from "../../../react-atlas-core/src/DatePicker/index";

import renderer from "react-test-renderer";

describe("DatePicker Test suite", () => {
  it("DatePicker - change & refresh component", function() {
    const dp = mount(<DatePickerCore selected={"2017-11-29"} />);
    dp.update();
  });

  it("DatePicker - Correct render test", function() {
    const tree = renderer
      .create(<DatePickerCore selected={"2017-11-29"} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  /*	This test is commented out until the "event not defined" issue is solved.
  it("DatePicker - Change event test ", function() {
    const dp = shallow(<DatePickerCore selected={"2017-11-29"} onChange={(date)=>console.log("[INFO] onChange function triggered")}/>);
		let expectedValue = moment("2017-11-29");
		
		expect(dp.state().startDate.isSame(expectedValue)).toBe(true);
		
		let newValue = moment();
		dp.simulate('change', newValue);
		expect(dp.state().startDate.isSame(newValue)).toBe(true);
  });
	*/
});
