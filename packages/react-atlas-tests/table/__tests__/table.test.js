import React from "react";
import { mount } from "enzyme";
import { Table, TableHeader } from "react-atlas-core";

describe("Test table component", () => {
  it("Test default props", function() {
    const result = mount(
        <Table>
          <TableHeader>Product ID</TableHeader>
          <TableHeader>Product Name</TableHeader>
          <TableHeader>Product Price</TableHeader>
        </Table>
    );
  });
});
