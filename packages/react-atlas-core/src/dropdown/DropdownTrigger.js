/*
Dropdown inspired and mostly taken from:
react-simple-dropdown
https://github.com/Fauntleroy/react-simple-dropdown
Copyright (c) 2015, Timothy Kempf <tim@kemp59f.info>
*/

import React, { createClass, PropTypes } from 'react';

/**
 * Contains the component or element that will trigger the Dropdown on and off.
 */
const DropdownTrigger = ({ children, ...props }) => (
	  <a
	    {...props}
	    href="#dropdown-trigger"
	  >
	    {children}
	  </a>
);

DropdownTrigger.propTypes = {
	children: PropTypes.any
};

DropdownTrigger.styleguide = {
  category: 'Navigation',
  index: '5.3',
  wrappedExample: true,
  example: `
// Dropdown Dummy Data {
var countries = [
  { value: 'EN-gb', label: 'England'},
  { value: 'ES-es', label: 'Spain'},
  { value: 'TH-th', label: 'Thailand'},
  { value: 'EN-en', label: 'USA'},
  { value: 'FR-fr', label: 'France'}
];
// }
// Internal Methods {
class DropdownTriggerExample extends React.Component {

  handleChange = (dropdown, value) => {
    const newState = {};
    newState[dropdown] = value;
    this.setState(newState);
  };

  render () {
// }
    return (
      <section>
        <h5>DropdownTrigger Example</h5>
        <Dropdown>
          <DropdownTrigger>
            <div>Trigger Element</div>
          </DropdownTrigger>
          <DropdownContent>
            <ul>
              {countries.map((country, idx) => (
                <li key={idx}>{country.label}</li>
              ))}
            </ul>
          </DropdownContent>
        </Dropdown>
      </section>
    );
// Mount Component {
  }
}
ReactDOM.render(<DropdownTriggerExample/>, mountNode);
// }
`
};

export default DropdownTrigger;
