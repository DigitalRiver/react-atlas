
import React from 'react'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Avatar from '../index.js'

let title = "testTitle";
let image = "picture.jpg";
let icon = 'icon={<i className="fa fa-github"></i>}';

describe('Testing Avatar component', () => {
  it('Set props should match what was passed in', function() {
    const result = mount(<Avatar title={title} image={image} icon={icon}/>);
    expect(result.props().title).to.equal(title);
    expect(result.props().image).to.equal(image);
    expect(result.find('img').length).to.equal(1);
    expect(result.props().icon).to.equal(icon);
  });

  it('If image is not set then state.image should be equal to defaultImage', function() {
    const result = mount(<Avatar defaultImage={image}/>);
    expect(result.state().image).to.equal(image);
  });

  it('If image and defaultImage are not set then state.image should be equal to null', function() {
    const result = mount(<Avatar/>);
    expect(result.state().image).to.equal(null);
  });

  it('If an image is not set and an icon is set then avatar should have the icon as a child.', function() {
    const result = shallow(<Avatar icon={icon}/>);
    expect(result.state().image).to.equal(null);
    expect(result.type()).to.equal('div');
    expect(result.contains(icon)).to.equal(true);
  });

  it('If image is set but fails to load fall back on the default image.', function() {
    const result = mount(<Avatar image={"incorrect.jpg"} defaultImage={image} />);
    var img = result.find('img');
    img.simulate('error');
    expect(result.state().image).to.equal(image);
  });

  it('The avatar component should fall back on the title prop if image and defaultImage props are not set or fail to load.', function() {
    const result = mount(<Avatar image={image} title={title}/>);
    var img = result.find('img');
    img.simulate('error');
    expect(result.state().image).to.equal(null);
    let child = result.children().at(0);
    expect(child.text()).to.equal(title[0]);
  });
});
