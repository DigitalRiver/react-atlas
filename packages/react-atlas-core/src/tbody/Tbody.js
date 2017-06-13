import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';

const Tbody = ({ className, children, ...props }) =>
  <tbody {...props} className={cx(className)}>
    {children}
  </tbody>
;

Tbody.propTypes = {
  "children": PropTypes.any
};

Tbody.styleguide = {
  "category": "Table",
  "index": "7.4",
  "example": 
    `
<section>
  <h5>Tbody Example</h5>
    <table>
      <Tbody>
        <tr>
          <td>Just Tbody</td>
          <td>No Tr</td>
        </tr>
        <tr>
          <td>No Td</td>
          <td>No Table</td>
        </tr>
      </Tbody>
    </table>
</section>
`
  
};

export default Tbody;
