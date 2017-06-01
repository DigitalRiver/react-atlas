import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';

const Td = ({ className, children, ...props }) => {
  const classes = cx(
    {
      "td": true
    }
  );

  return (
    <td {...props} styleName={classes} className={cx(className)}>
      {children}
    </td>
  );
};

Td.propTypes = {
  "children": PropTypes.any,
  "className": PropTypes.string
};

Td.styleguide = {
  "category": "Table",
  "index": "7.6",
  "example": 
    `
<section>
  <h5>Td Example</h5>
    <table>
      <tbody>
        <tr>
          <Td>Just Td</Td>
          <Td>No Tr</Td>
        </tr>
        <tr>
          <Td>No Tbody</Td>
          <Td>No Table</Td>
        </tr>
      </tbody>
    </table>
</section>
`
  
};

export default Td;
