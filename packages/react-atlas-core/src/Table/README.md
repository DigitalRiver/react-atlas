
###### Basic Table:

	<Table data={[{id: 0, name: "Bear", price: "$100"}, {id: 1, name: "Corn", price: "$2"}, {id: 2, name: "Shark Banana", price: "$125"}]}>
      <TableHeader dataField='id' isKey={ true }>Product ID</TableHeader>
      <TableHeader dataField='name'>Product Name</TableHeader>
      <TableHeader dataField='price'>Product Price</TableHeader>
    </Table>

###### Search Table:

	<Table data={[{id: 0, name: "Bear", price: "$100"}, {id: 1, name: "Corn", price: "$2"}, {id: 2, name: "Shark Banana", price: "$125"}]} search={true}>
      <TableHeader dataField='id' searchable={true} isKey={true}>Product ID</TableHeader>
      <TableHeader dataField='name' searchable={true}>Product Name</TableHeader>
      <TableHeader dataField='price' searchable={true}>Product Price</TableHeader>
    </Table>

###### Pagination Table:

	<Table pagination={true} data={[{id: 0, name: "Bear", price: "$100"}, {id: 1, name: "Corn", price: "$2"}, {id: 2, name: "Shark Banana", price: "$125"}]}>
      <TableHeader dataField='id' isKey={ true }>Product ID</TableHeader>
      <TableHeader dataField='name'>Product Name</TableHeader>
      <TableHeader dataField='price'>Product Price</TableHeader>
    </Table>
