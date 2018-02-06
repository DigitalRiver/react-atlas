import React from "react";
import { mount, shallow } from "enzyme";
import { TextAreaCore } from "../../../react-atlas-core/src/TextArea/index";

describe("Testing TextArea component", () => {
	
  it("TextArea component - Basic test", function() {
    const textArea = mount(<TextAreaCore />);
  });

  it("TextArea component - Basic test (invalid)", function() {
    const textArea = mount(<TextAreaCore isValid={false} />);
		textArea.update();
  });

  it("TextArea component - Custom properties", function() {
    const textArea = mount(
      <TextAreaCore
        isValid={true}
        className={""}
        name={"TextAreaName"}
        value={""}
        header={"Header"}
        resizable={true}
        small={true}
        medium={false}
        large={false}
        maxLength={10}
        placeholder={"PlaceHolder"}
        onChange={() => {
          return true;
        }}
        required={false}
        disabled={false}
        hidden={false}
				style={{marginRight: 'em'}}
				label = "Label"
				tooltip={"Tooltip text."}
				tooltipRight={false}
				
      />
    );
  });
	
	it("TextArea component - Tooltip without header", function() {
		
		expect(() => {mount(< TextAreaCore maxLength={10} tooltip={"Tooltiptext"}/>)} ).toThrow();
	});

	it("TextArea component - Tooltip with header", function() {
		const textArea = mount(< TextAreaCore maxLength={10} label="Label" tooltip={"Tooltiptext"} header={"Header text."}/>);
	});
	
  it("TextArea component - Focus event", function() {
    const textArea = mount(<TextAreaCore />);
    expect(textArea.state().active).toEqual(false);
    textArea.simulate("focus");
    expect(textArea.state().active).toEqual(true);
    textArea.simulate("blur");
    expect(textArea.state().active).toEqual(false);
  });

	it("TextArea component - Simple text inserted", function() {
		const textArea = mount(< TextAreaCore maxLength={10} />);
		textArea.state().value = 'iou';
		let input = textArea.findWhere((n) => {return n.props().styleName == 'input max'});
		input.simulate('focus');
		input.simulate('change');
		expect(textArea.state().remaining).toEqual(7);
		expect(textArea.state().value).toEqual('iou');
	});

	it("TextArea component - Simple text inserted(no maxLenght)", function() {
		const textArea = mount(< TextAreaCore />);
		textArea.state().value = 'iou';
		let input = textArea.findWhere((n) => {return n.props().styleName == 'input max'});
		input.simulate('focus');
		input.simulate('change');
		expect(textArea.state().value).toEqual('iou');
	});
	
	it("TextArea component - Simple text inserted(with onChange prop) " , function() {
		const textArea = mount(< TextAreaCore maxLength={10} onChange={() => {console.log('[INFO]: Inside onChange'); return true} }/>);
		textArea.state().value = 'iou';
		let input = textArea.findWhere((n) => {return n.props().styleName == 'input max'});
		input.simulate('focus');
		input.simulate('change');
		expect(textArea.state().remaining).toEqual(7);
		expect(textArea.state().value).toEqual('iou');
	});

});
