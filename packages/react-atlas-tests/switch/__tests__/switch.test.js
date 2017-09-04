import React from "react";
import { mount } from "enzyme";
import { SwitchCore } from "../../../react-atlas-core/src/Switch/index";

describe("Testing switch component", () => {
	it("Switch component - Basic test", function() {
		const comp = mount(<SwitchCore onColor="black" />);
	});
  
	it("Switch component - Basic test one click switch", function() {
		const comp = mount(<SwitchCore onColor="black" />);
		expect(comp.state().checked).toEqual(false);
		comp.find('Input').simulate('click');
		expect(comp.state().checked).toEqual(true);
	});

	it("Switch component - Basic test two clicks switch", function() {
		const comp = mount(<SwitchCore onColor="black" />);
		expect(comp.state().checked).toEqual(false);
		comp.find('Input').simulate('click');
		expect(comp.state().checked).toEqual(true);
		comp.find('Input').simulate('click');
		expect(comp.state().checked).toEqual(false);
	});

	it("Switch component - Basic test one click switch with onBeforeChange", function() {
		const comp = mount(<SwitchCore onColor="black" onBeforeChange={function (){console.log('onBeforeChange triggered'); return true} }/>);
		expect(comp.state().checked).toEqual(false);
		comp.find('Input').simulate('click');
		expect(comp.state().checked).toEqual(true);
	});

	it("Switch component - Basic test one click switch with onBeforeChange II", function() {
		const comp = mount(<SwitchCore onColor="black" onBeforeChange={function (){console.log('onBeforeChange triggered'); return false} }/>);
		expect(comp.state().checked).toEqual(false);
		comp.find('Input').simulate('click');
		expect(comp.state().checked).toEqual(false);
	});
	
});
