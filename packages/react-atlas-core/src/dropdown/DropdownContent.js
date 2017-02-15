/*
Dropdown inspired and mostly taken from:
react-simple-dropdown
https://github.com/Fauntleroy/react-simple-dropdown
Copyright (c) 2015, Timothy Kempf <tim@kemp59f.info>
*/
import React, { component, PropTypes } from 'react';
import { classNames } from '../utils';

/**
 * Component used inside Dropdown to define content. Often paired with DropdownList & DropdownListItem.
 */
const DropdownContent = ({ children, className, active, ...props }) => {
    return (
      <div {...props}>
        {children}
      </div>
    )
};

DropdownContent.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
};

DropdownContent.defaultProps = {
	className: ''
};

DropdownContent.styleguide = {
  category: 'Navigation',
  index: '5.4',
  wrappedExample: true,
  example: `
// Dropdown Dummy Data {
var countries = [
  { value: 'EN-gb', label: 'England', img: 'http://' },
  { value: 'ES-es', label: 'Spain', img: 'http://' },
  { value: 'TH-th', label: 'Thailand', img: 'http://' },
  { value: 'EN-en', label: 'USA', img: 'http://' },
  { value: 'FR-fr', label: 'France', img: 'http://' }
];

class DropdownContentExample extends React.Component {

  handleChange = (dropdown, value) => {
    const newState = {};
    newState[dropdown] = value;
    this.setState(newState);
  };

  render () {
// }
    return (
      <section>
        <h5>DropdownContent Example</h5>
        <Dropdown>
          <DropdownTrigger>
            <Button>Dropdown</Button>
          </DropdownTrigger>
          <DropdownContent>
            <p>Any content</p>
            <ul>
              <li>A Regular List Item</li>
            </ul>
            <DropdownList>
              {countries.map((country, idx) => (
                <DropdownListItem key={idx}>{country.label}</DropdownListItem>
              ))}
            </DropdownList>
          </DropdownContent>
        </Dropdown>
      </section>
    );
// Mount Component {
  }
}
ReactDOM.render(<DropdownContentExample/>, mountNode);
// }
`
};

export default DropdownContent;
