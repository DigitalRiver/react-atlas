import React, { PropTypes } from "react";
import cx from 'classNames';

const Thead = ({ className, children, ...props }) =>
  <thead {...props} className={className}>
    {children}
  </thead>
;

Thead.propTypes = {
  "children": PropTypes.any
};

Thead.styleguide = {
  "category": "Table",
  "index": "7.2",
  "example": 
    `
<section>
  <h5>Thead Example</h5>
    <table>
      <Thead>
        <tr>
          <th>Just</th>
          <th>Thead</th>
        </tr>
      </Thead>
      <tbody>
        <tr>
          <td>No Th</td>
          <td>No Tr</td>
        </tr>
        <tr>
          <td>No Td, No Tbody</td>
          <td>No Table</td>
        </tr>
      </tbody>
    </table>
</section>
`
  
};

export default Thead;
