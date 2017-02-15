/*
Dropdown inspired and mostly taken from:
react-simple-dropdown
https://github.com/Fauntleroy/react-simple-dropdown
Copyright (c) 2015, Timothy Kempf <tim@kemp59f.info>
*/
import React, { component, PropTypes } from 'react';
import { classNames } from '../utils';

/**
 * Optional component to use within DropdownList & DropdownContent components. It just sets styles to `<li>` in dropdowns.
 */
const DropdownListItem = ({ children, className, active, ...props }) => {

    return (
      <li {...props} className={className}>
        {children}
      </li>
    )
};

DropdownListItem.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
};

DropdownListItem.defaultProps = {
	className: ''
};

DropdownListItem.styleguide = {
  category: 'Navigation',
  index: '5.6',
  wrappedExample: true,
  example: `
// Dropdown Dummy Data {
var countries = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain' },
  { value: 'TH-th', label: 'Thailand' },
  { value: 'EN-en', label: 'USA' },
  { value: 'FR-fr', label: 'France' }
];
// }
// Internal Methods {
class DropdownListItemExample extends React.Component {

  handleChange = (dropdown, value) => {
    const newState = {};
    newState[dropdown] = value;
    this.setState(newState);
  };

  render () {
// }
    return (
      <section>
        <h5>DropdownListItem Example</h5>
        <Dropdown>
          <DropdownTrigger>
            <Button>Dropdown</Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownList >
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
ReactDOM.render(<DropdownListItemExample/>, mountNode);
// }
`
};

export default DropdownListItem;
