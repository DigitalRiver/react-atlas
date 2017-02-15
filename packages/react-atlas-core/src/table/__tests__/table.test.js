import React from "react";
import { mount } from "enzyme";
import { Table, Thead, Tr, Th, Td, Tbody, Tfoot } from "../../table";

describe("Test table component", () => {
  it("Test default props", function() {
    const result = mount(
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
    );
  });
});
