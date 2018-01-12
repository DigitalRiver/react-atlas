import React from "react";
import { mount } from "enzyme";
import { render } from "enzyme";

import { AccordionCore } from "../../../react-atlas-core/src/Accordion/index";
import { PanelCore as Panel } from "../../../react-atlas-core/src/Panel/index";

import { verifyPropsDefaultValue } from "../../utils/propsVerification";

import renderer from 'react-test-renderer';

describe("Test correct render", () => {

  it("Test correct render", function() {
	const accordion =  <AccordionCore>
						 <Panel title="First">Text for first accordion item</Panel>
                         <Panel title="Second">Text for second accordion item</Panel>
                       </AccordionCore>;
	const tree = renderer.create(accordion).toJSON();
	expect(tree).toMatchSnapshot();
  });
  
  it("Test all collapsed with expand", () => {
	const acc =  mount(<AccordionCore >
						  <Panel>Text for first accordion item</Panel>
						  <Panel>Text for second accordion item</Panel>
						  <Panel>Text for third accordion item</Panel>
						  <Panel>Text for fourth accordion item</Panel>
					   </AccordionCore>);
  });
  
  it("Test all collapsed, disabled", () => {
	const acc =  mount(<AccordionCore disabled>
						  <Panel>Text for first accordion item</Panel>
						  <Panel>Text for second accordion item</Panel>
						  <Panel>Text for third accordion item</Panel>
						  <Panel>Text for fourth accordion item</Panel>
					   </AccordionCore>);
  });
  
  it("Test all expanded", () => {
	const acc =  mount(<AccordionCore>
						 <Panel>Text for first accordion item</Panel>
						 <Panel expanded>Text for second accordion item</Panel>
						 <Panel>Text for third accordion item</Panel>
					   </AccordionCore>);
	expect(acc.state().activeChildArray[0]).toEqual(false);
	expect(acc.state().activeChildArray[1]).toEqual(true);  
	expect(acc.state().activeChildArray[2]).toEqual(false);
  });

  it("Test all collapsed", () => {
	const acc =  mount(<AccordionCore>
						<Panel>first</Panel>
						<Panel>second</Panel>
					   </AccordionCore>);
  });  
  
  it("Test expand one with all collapsed", () => {
	const acc =  mount(<AccordionCore>
						<Panel title='first'>first</Panel>
						<Panel title='second'>second</Panel>
					   </AccordionCore>);
	acc.find('div').forEach((n) => n.props().children=='first' ? n.simulate('click') : null);
	expect(acc.state().activeChildArray[0]).toEqual(true);
	expect(acc.state().activeChildArray[1]).toEqual(false);
  });  

  it("Test switch from one expanded to another expanded", () => {
	const acc =  mount(<AccordionCore>
						<Panel title='first'>first</Panel>
						<Panel title='second'>second</Panel>
					   </AccordionCore>);
	acc.find('div').forEach((n) => n.props().children=='first' ? n.simulate('click') : null);
	expect(acc.state().activeChildArray[0]).toEqual(true);
	expect(acc.state().activeChildArray[1]).toEqual(false);
	acc.find('div').forEach((n) => n.props().children=='second' ? n.simulate('click') : null);
	expect(acc.state().activeChildArray[0]).toEqual(false);
	expect(acc.state().activeChildArray[1]).toEqual(true);
  });  

  it("Test switch from one expanded to another expanded II", () => {
	const acc =  mount(<AccordionCore>
						<Panel title='first'>first</Panel>
						<Panel title='second' expanded >second</Panel>
					   </AccordionCore>);
	expect(acc.state().activeChildArray[0]).toEqual(false);
	expect(acc.state().activeChildArray[1]).toEqual(true);
	acc.find('div').forEach((n) => n.props().children=='first' ? n.simulate('click') : null);
	expect(acc.state().activeChildArray[0]).toEqual(true);
	expect(acc.state().activeChildArray[1]).toEqual(false);
  }); 
  
  it("Test expand one, collapse then same (all collapsed)", () => {
	const acc =  mount(<AccordionCore>
						<Panel title='first'>first</Panel>
						<Panel title='second'>second</Panel>
					   </AccordionCore>);
	acc.find('div').forEach((n) => n.props().children=='first' ? n.simulate('click') : null);
	expect(acc.state().activeChildArray[0]).toEqual(true);
	expect(acc.state().activeChildArray[1]).toEqual(false);
	
	acc.find('div').forEach((n) => n.props().children=='first' ? n.simulate('click') : null);
  });  

  it("Test expand two, multiOpen (all collapsed)", () => {
	const acc =  mount(<AccordionCore multiOpen>
						<Panel title='first'>first</Panel>
						<Panel title='second'>second</Panel>
					   </AccordionCore>);
	acc.find('div').forEach((n) => n.props().children=='first' ? n.simulate('click') : null);
	expect(acc.state().activeChildArray[0]).toEqual(true);
	expect(acc.state().activeChildArray[1]).toEqual(false);
	acc.find('div').forEach((n) => n.props().children=='second' ? n.simulate('click') : null);	
	expect(acc.state().activeChildArray[0]).toEqual(true);
	expect(acc.state().activeChildArray[1]).toEqual(true);
	
	acc.find('div').forEach((n) => n.props().children=='first' ? n.simulate('click') : null);	
	expect(acc.state().activeChildArray[0]).toEqual(false);
	expect(acc.state().activeChildArray[1]).toEqual(true);
	acc.find('div').forEach((n) => n.props().children=='second' ? n.simulate('click') : null);	
  });  

  it("Test expand all by clicking expandAll link", () => {
	const acc =  mount(<AccordionCore expandAll>
						  <Panel>Text for first accordion item</Panel>
						  <Panel>Text for second accordion item</Panel>
						  <Panel>Text for third accordion item</Panel>
						  <Panel>Text for fourth accordion item</Panel>
					   </AccordionCore>);
					   
	acc.find('div').forEach((n) => n.props().children=='Expand All' ? n.simulate('click') : null);
	
	expect(acc.state().activeChildArray[0]).toEqual(true);
	expect(acc.state().activeChildArray[1]).toEqual(true);
	expect(acc.state().activeChildArray[2]).toEqual(true);
	expect(acc.state().activeChildArray[3]).toEqual(true);
  });

  
});
