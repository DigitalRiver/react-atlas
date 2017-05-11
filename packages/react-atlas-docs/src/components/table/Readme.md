Default table

    function buildProducts(count){
      let products = [];
      const startId = 0;
      for (let i = 0; i < count; i++) {
        const id = startId + i;
        products.push({
          id: id,
          name: 'Product ' + id,
          price: 2100 + i
        });
      }
      return products;
    }
    var products = buildProducts(10);
    this.options = {
      defaultSortName: 'name',  // default sort column name
      defaultSortOrder: 'desc'  // default sort order
    };
    <div>
      <Table data={ products } selectRow={{mode: 'checkbox'}} options={this.options}>
        <TableHeader dataField='id' isKey>Product ID</TableHeader>
        <TableHeader dataField='name' dataSort>Product Name</TableHeader>
        <TableHeader dataField='price' dataSort>Product Price</TableHeader>
      </Table>
    </div>
    
Table with pagination

    function buildProducts(count){
      let products = [];
      const startId = 0;
      for (let i = 0; i < count; i++) {
        const id = startId + i;
        products.push({
          id: id,
          name: 'Product ' + id,
          price: 2100 + i
        });
      }
      return products;
    }
    var products = buildProducts(70);
    this.options = {
      defaultSortName: 'name',  // default sort column name
      defaultSortOrder: 'desc',  // default sort order
      paginationShowsTotal: true
    };
    <div>
      <Table data={ products } selectRow={{mode: 'checkbox'}} options={this.options} pagination>
        <TableHeader dataField='id' isKey>Product ID</TableHeader>
        <TableHeader dataField='name' dataSort>Product Name</TableHeader>
        <TableHeader dataField='price' dataSort>Product Price</TableHeader>
      </Table>
    </div>