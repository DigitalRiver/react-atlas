
Basic Table:

  <div>
    <Table data={ [{id: 0, name: "bear", price: "50"}, {id: 1, name: "gorilla", price: "75"}, {id: 2, name: "shark", price: "97"}] }>
      <TableHeader dataField='id' isKey>Product ID</TableHeader>
      <TableHeader dataField='name' dataSort>Product Name</TableHeader>
      <TableHeader dataField='price' dataSort>Product Price</TableHeader>
    </Table>
  </div>