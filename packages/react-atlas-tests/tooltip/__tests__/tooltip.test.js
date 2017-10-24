import React from "react";
import { mount } from "enzyme";
import { TooltipCore } from "../../../react-atlas-core/src/Tooltip/index";

import { verifyPropsDefaultValue } from "../../utils/propsVerification";
	
function myWait(secs){
	let startTime = new Date();
	let now = new Date();
	while(now-startTime < secs){
		now = new Date();
	}
}
	
describe("Testing TooltipCore component", () => {
	
	it("Tooltip component - Properties basic test", function() {
		const comp = mount(< TooltipCore
								tooltip={"Hey I'm a tooltip"}
								position={"top"}
								icon={"<i class='fa fa-github'></i>"}
								tooltipDelay={3000}
								active={false}
								className={"class"}	
							/>)
		const expectedProps = new Map([
			['tooltip', "Hey I'm a tooltip"],
			['position', 'top'],
			['tooltipDelay', 3000],
			['active', false],
			['className', 'class']
		]);
			
		expect(verifyPropsDefaultValue(comp, expectedProps)).toEqual(true);					
	});
	
	it("Tooltip component - Mouse in with delays", function() {
		const comp = mount(<TooltipCore
								tooltip={"Hey I'm a tooltip"}
								tooltipDelay={1000}
							/>)
		jest.useFakeTimers();
		expect(comp.state().active).toEqual(false);		
		comp.simulate('mouseEnter');
		jest.runAllTimers();
		expect(comp.state().active).toEqual(true);
	});
	
	it("Tooltip component - Mouse in/out", function() {
		const comp = mount(< TooltipCore tooltip={"Hey I'm a tooltip"} />)			
		
		comp.simulate('mouseEnter');
		expect(comp.state().active).toEqual(true);
		
		comp.simulate('mouseLeave');
		expect(comp.state().active).toEqual(false);
	});
	
});