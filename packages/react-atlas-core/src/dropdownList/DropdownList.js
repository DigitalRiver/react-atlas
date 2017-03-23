/*
Dropdown inspired and mostly taken from:
react-simple-dropdown
https://github.com/Fauntleroy/react-simple-dropdown
Copyright (c) 2015, Timothy Kempf <tim@kemp59f.info>
*/

import React, { component, PropTypes } from "react";
import cx from 'classNames';

/**
 * Optional component to use inside DropdownContent component, it just applies styles to a `<ul>` and wraps DropdownListItem
 */

const DropdownList = ({ children, className, active, ...props }) => {
  return (
    <ul {...props} className={className} styleName={cx("list")}>
      {children}
    </ul>
  );
};

DropdownList.propTypes = {
  "children": PropTypes.any,
  "className": PropTypes.string
};

DropdownList.defaultProps = {
  "className": ""
};

DropdownList.styleguide = {
  "category": "Navigation",
  "index": "5.5",
  "wrappedExample": true,
  "example": 
    `
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
class DropdownListExample extends React.Component {

  handleChange = (dropdown, value) => {
    const newState = {};
    newState[dropdown] = value;
    this.setState(newState);
  };

  render () {
// }
    return (
      <section>
        <h5>DropdownList Example</h5>

        <Dropdown>
          <DropdownTrigger>
            <Button>Dropdown</Button>
          </DropdownTrigger>
          <DropdownContent>
             <DropdownList>
              <li>Can be used</li>
              <li>With Regular</li>
              <li>list elements.</li>
            </DropdownList>
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
ReactDOM.render(<DropdownListExample/>, mountNode);
// }
`
  
};

export default DropdownList;
