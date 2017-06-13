import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';

const Th = ({ className, children, ...props }) => {
  const classes = cx(
    {
      "th": true
    }
  );

  return (
    <th {...props} styleName={classes} className={cx(className)}>
      {children}
    </th>
  );
};

Th.propTypes = {
  "children": PropTypes.any,
  "className": PropTypes.string
};

Th.styleguide = {
  "category": "Table",
  "index": "7.3",
  "example": 
    `
<section>
  <h5>Th Example</h5>
    <table>
      <thead>
        <tr>
          <Th>Heading</Th>
          <Th>Another</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Just Th</td>
          <td>No Thead, No Tr</td>
        </tr>
        <tr>
          <td>No Tbody, No Td</td>
          <td>No Table</td>
        </tr>
      </tbody>
    </table>
</section>
`
  
};

export default Th;
