import React from "react";
import { mount } from "enzyme";
import { Table, Thead, Tr, Th, Td, Tbody, Tfoot } from "react-atlas-core";

describe("Test table component", () => {
  it("Test default props", function() {
    const result = mount(
        <Table>
          <TableHeaderColumn>Product ID</TableHeaderColumn>
          <TableHeaderColumn>Product Name</TableHeaderColumn>
          <TableHeaderColumn>Product Price</TableHeaderColumn>
        </Table>
    );
  });
});
