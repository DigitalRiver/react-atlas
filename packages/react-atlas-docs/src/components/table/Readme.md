
    function buildProducts(count){
      let products = [];
      const startId = 0;
      for (let i = 0; i < count; i++) {
        const id = startId + i;
        products.push({
          id: id,
          name: 'Item name ' + id,
          price: 2100 + i
        });
      }
      return products;
    }
    var products = buildProducts(70);
    this.options = {
      defaultSortName: 'name',  // default sort column name
      defaultSortOrder: 'desc'  // default sort order
    };
    <div>
      <Table data={ products } selectRow={{mode: 'checkbox'}} options={this.options} >
        <TableHeader dataField='id' isKey>Product ID</TableHeader>
        <TableHeader dataField='name' dataSort={ true }>Product Name</TableHeader>
        <TableHeader dataField='price'>Product Price</TableHeader>
      </Table>
    </div>
    