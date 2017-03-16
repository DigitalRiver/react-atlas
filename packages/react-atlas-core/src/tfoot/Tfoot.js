import React, { PropTypes } from "react";
import cx from 'classNames';

const Tfoot = ({ className, children, ...props }) =>
  <tfoot {...props} className={className}>
    {children}
  </tfoot>
;

Tfoot.propTypes = {
  "children": PropTypes.any
};

Tfoot.styleguide = {
  "category": "Table",
  "index": "7.7",
  "example": 
    `
<section>
  <h5>Tfoot Example</h5>
    <table>
      <tbody>
        <tr>
          <td>Just Tfoot</td>
          <td>No Tr, No Td</td>
        </tr>
        <tr>
          <td>no Th, No Tbody</td>
          <td>No Table, No Thead</td>
        </tr>
      </tbody>
      <Tfoot>
        <tr>
          <th>Foot</th>
          <th>Another</th>
        </tr>
      </Tfoot>
    </table>
</section>
`
  
};

export default Tfoot;
