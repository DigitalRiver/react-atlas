import React, { PropTypes } from "react";

const Tbody = ({ children, ...props }) => 
  <tbody {...props}>
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
