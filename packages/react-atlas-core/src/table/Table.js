import React, { PropTypes } from 'react';
import themeable from 'react-themeable';
import { classNames } from '../utils';

const Table = ({className, children, ...props}) => {

    const theme = themeable(props.theme);
	  const classes = classNames({
          table: true
    }, className);

    return (
        <table {...props} {...theme(1, ...classes)}>
          {children}
        </table>
    );
};

Table.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};
Table.defaultProps = {
  className: '',
  theme: {
    'table': true
  }
};

Table.styleguide = {
  category: 'Table',
  index: '7.1',
  example: `
<section>
  <h5>Full Table Example</h5>
    <Table>
      <Thead>
        <Tr>
          <Th>Heading</Th>
          <Th>Another</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Row 1</Td>
          <Td>Cell 1</Td>
        </Tr>
        <Tr>
          <Td>Row 2</Td>
          <Td>Cell 2</Td>
        </Tr>
        <Tr>
          <Td>Row 3</Td>
          <Td>Cell 3</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Foot</Th>
          <Th>Another</Th>
        </Tr>
      </Tfoot>
    </Table>
</section>
`
};

export default Table;
