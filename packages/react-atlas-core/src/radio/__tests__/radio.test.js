import React from 'react'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Radio from '../../radio'

describe('Testing radio component', () => {
  it('Set props should match what was passed in', function() {
    const result = mount(<Radio label="Checked Radio" value="checkedRadio"></Radio>);
    // expect(result.props().aspectRatio).to.equal(aspectRatio);
  });
});
