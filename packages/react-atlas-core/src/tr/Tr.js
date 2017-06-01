import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';

const Tr = ({ className, children, ...props }) =>
  <tr {...props} className={className}>
    {children}
  </tr>
;

Tr.propTypes = {
  "children": PropTypes.any
};

Tr.styleguide = {
  "category": "Table",
  "index": "7.5",
  "example": 
    `
<section>
  <h5>Tr example</h5>
    <table>
      <thead>
        <Tr>
          <th>Heading</th>
          <th>Another</th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <td>Just Tr</td>
          <td>No Td, Th</td>
        </Tr>
        <Tr>
          <td>No Tbody</td>
          <td>No Table</td>
        </Tr>
      </tbody>
    </table>
</section>
`
  
};

export default Tr;
