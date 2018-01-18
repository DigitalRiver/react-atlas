import React from "react";
import { mount } from "enzyme";
import { DialogCore } from "../../../react-atlas-core/src/Dialog/index";
import { ButtonCore } from "../../../react-atlas-core/src/Button/index";

import renderer from 'react-test-renderer';

function handleToggle(){console.log('Inside handleToggle') };
function handleOk(){ console('-.-') };
function handleCancel(){ console('.-.') };
	
	
describe("Dialog component - Test correct render", () => {
  it("Test correct render", function() {  });
	const tree = renderer.create(<div> 
			<ButtonCore primary onClick={handleToggle}>Open Info Dialog</ButtonCore>
			<DialogCore 
        active={true} 
        onOk={handleOk} 
        title="Info"
        overlay
        info={true}
			>
				<div>This is Dialog example<br/>Any child components could be put here.</div>
			</DialogCore>
			</div>).toJSON();
	expect(tree).toMatchSnapshot(); 	
});


describe("Dialog component - Basic test", () => {
  
	it("Dialog component(info) - Basic test", function() {
    const dial = mount(<div> 
			<ButtonCore primary onClick={handleToggle}>Open Info Dialog</ButtonCore>
			<DialogCore 
        active={true} 
        onOk={handleOk} 
        title="Info"
        overlay
        info={true}
			>
				<div>This is Dialog example<br/>Any child components could be put here.</div>
			</DialogCore>
			</div>);
  });

	it("Dialog component(confirm) - Basic test", function() {
    const dial = mount(<div> 
			<ButtonCore primary onClick={handleToggle}>Open confirm Dialog</ButtonCore>
			<DialogCore 
        active={true} 
        onOk={handleOk} 
				onCancel={handleCancel}
        title="Confirm"
        overlay
        confirm={true}
			>
				<div>This is Dialog example<br/>Any child components could be put here.</div>
			</DialogCore>
			</div>);	
  });

	it("Dialog component(warning) - Basic test", function() {
    const dial = mount(<div> 
			<ButtonCore primary onClick={handleToggle}>Open warning Dialog</ButtonCore>
			<DialogCore 
        active={true} 
        onOk={handleOk} 
				onCancel={handleCancel}
        title="Warning"
        overlay
        warning={true}
			>
				<div>This is Dialog example<br/>Any child components could be put here.</div>
			</DialogCore>
			</div>);
  });
	
});

//dial.find('button').simulate('click');
//dial.findWhere( (n)=> {if(n.props().primary){n.simulate('click')}} );//.simulate('click');