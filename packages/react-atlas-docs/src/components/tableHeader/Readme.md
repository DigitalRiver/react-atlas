    <div>
        <Table data={ this.products } selectRow={{mode: 'checkbox'}} options={this.options} >
        <TableHeader dataField='id' isKey>Product ID</TableHeader>
        <TableHeader dataField='name' dataSort={ true }>Product Name</TableHeader>
        <TableHeader dataField='price'>Product Price</TableHeader>
      </Table>
    </div>