import React from "react";
import { mount, shallow } from "enzyme";
import { TextAreaCore } from "../../../react-atlas-core/src/TextArea/index";

describe("Testing TextArea component", () => {
	
	it("TextArea component - Basic test", function() {
		const textArea = mount(<TextAreaCore/>); 
	});
	
	it("TextArea component - Basic test (invalid)", function() {
		const textArea = mount(<TextAreaCore
									isValid = {false}
							   />); 
	});

	it("TextArea component - Custom properties", function() {
		const textArea = mount(<TextAreaCore 
								  isValid = {true}
								  className = {""}
								  name = {"TextAreaName"}
								  value = {""}
								  header = {"Header"}
								  resizable = {true}
								  small = {true}
								  medium = {false}
								  large = {false}
								  maxLength = {10}
								  placeholder = {"PlaceHolder"}
								  onChange = {()=>{return true}}
								  required = {false}
								  disabled = {false}
								  hidden = {false}
							   />);							   
	});
	
	it("TextArea component - Focus event", function() {
		const textArea = mount(<TextAreaCore />);
		expect(textArea.state().active).toEqual(false);
		textArea.simulate('focus');
		expect(textArea.state().active).toEqual(true);
		textArea.simulate('blur');
		expect(textArea.state().active).toEqual(false);
	});
/*
	it("TextArea component - Simple text inserted", function() {
		const textArea = shallow(< TextAreaCore maxLength={10} />);
		textArea.simulate('focus');
		let input = textArea.findWhere((n) => { return n.props().multiline == true });
		input.simulate('change', 'a', 'change');
		expect(textArea.state().remaining).toEqual(9);
		expect(textArea.state().value).toEqual('a');
	});

	it("TextArea component - Simple text inserted(no maxLenght)", function() {
		const textArea = shallow(< TextAreaCore />);
		textArea.simulate('focus');
		let input = textArea.findWhere((n) => { return n.props().multiline == true });
		input.simulate('change', 'a', 'change');
		expect(textArea.state().value).toEqual('a');
	});
	
	it("TextArea component - Simple text inserted(with onChange prop) " , function() {
		const textArea = shallow(< TextAreaCore maxLength={10} onChange={(value, event, isValid) => {return true} }/>);
		textArea.simulate('focus');
		let input = textArea.findWhere((n) => { return n.props().multiline == true });
		input.simulate('change', 'a', 'change');
		expect(textArea.state().remaining).toEqual(9);
		expect(textArea.state().value).toEqual('a');
	});
	*/
});
