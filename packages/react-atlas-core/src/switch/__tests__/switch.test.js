import React from 'react'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Switch from '../../switch';

describe('Testing switch component', () => {
  it('Check default props', function() {
    const result = mount(<Switch onColor="black"/>);
  });
});
