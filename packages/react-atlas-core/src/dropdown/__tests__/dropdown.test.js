import React from 'react'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Dropdown, DropdownTrigger, DropdownContent, DropdownList} from '../../dropdown';
import Button from '../../button'
import sinon from 'sinon';

const hideWrapper = sinon.spy(Dropdown.prototype, '_hide');

var count = 0;

function onHideTestHandler() {
  count++;
}

describe('Testing Dropdown component', () => {
  it('Check default props', function() {
    const result = mount(<Dropdown>
                           <DropdownTrigger>
                             <Button>Dropdown Button</Button>
                           </DropdownTrigger>
                           <DropdownContent>
                             <DropdownList>
                             </DropdownList>
                           </DropdownContent>
                         </Dropdown>);
    expect(result.props().className).to.equal('');
  });

  it('Check click handler function.', function() {
    const stub = sinon.spy(Dropdown.prototype, 'onWindowClick');
    const result = shallow(<Dropdown></Dropdown>);
    result.simulate('click');
    sinon.assert.calledOnce(stub);
  });

  it('Make sure _isActive returns true when active is set.', function() {
    const result = shallow(<Dropdown active={true}></Dropdown>);
    expect(result.instance()._isActive()).to.equal(true);
  });

  it('Make sure _hide is not called when a click event happens and active is not set.', function() {
    const result = shallow(<Dropdown></Dropdown>);
    result.simulate('click');
    expect(hideWrapper.called).to.equal(false);
  });

  it('Make sure _hide is called when a click event happens and active=true.', function() {
    const result = shallow(<Dropdown active={true}></Dropdown>);
    result.simulate('click');
    sinon.assert.calledOnce(hideWrapper);
  });

  it('Make sure active gets set back to false when a click event happens and active=true.', function() {
    const result = shallow(<Dropdown active={true}></Dropdown>);
    result.simulate('click');
    expect(result.state().active).to.equal(false);
  });

  it("Make sure onHide is called when it is set and a click event happens and active is set", function() {
    const result = shallow(<Dropdown active={true} onHide={onHideTestHandler}></Dropdown>);
    result.simulate('click');
    expect(count).to.equal(1);
  });

  it("Make sure onHide is not called when it is set and a click event happens and active is not set", function() {
    const result = shallow(<Dropdown onHide={onHideTestHandler}></Dropdown>);
    result.simulate('click');
    expect(count).to.equal(0);
  });

  it('Check show() function', function() {
    const result = shallow(<Dropdown onHide={onHideTestHandler}></Dropdown>);
    result.instance()._show();
  });
});
