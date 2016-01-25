import React, { Component } from 'react';
import { Table, Th, Thead, Tbody, Tr, Td } from '../../components/table';
import Col from '../../components/col';

class TableTest extends Component {

  render () {
    return (
      <section>
        <h5>Table</h5>
        <Col sm="1/3">
          <Table>
            <Thead>
              <Tr>
                <Th>Hellooo</Th>
                <Th>Donks</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Goooodbye</Td>
                <Td>bonks</Td>
              </Tr>
              <Tr>
                <Td>Nathan</Td>
                <Td>Magnum</Td>
              </Tr>
            </Tbody>
          </Table>
        </Col>
      </section>
    );
  }
}

export default TableTest;
