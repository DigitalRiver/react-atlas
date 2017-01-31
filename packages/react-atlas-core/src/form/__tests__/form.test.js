import React from 'react'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Form from '../../form'

describe('Test form component', () => {
  it('Test default props', function() {
    const result = mount(<Form></Form>);
  });
});
