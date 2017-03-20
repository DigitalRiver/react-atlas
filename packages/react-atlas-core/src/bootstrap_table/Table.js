import React, { PropTypes } from "react";
import {BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const Table = ({ theme, ...props }) => {
    const styles = { ...theme };
    console.log(styles);
    // It's a data format example.
    function priceFormatter(cell, row){
        return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
    }
    return (
        <BootstrapTable {...props} theme={styles} striped={true} hover={true} >
            <TableHeaderColumn theme={styles} dataField="id" isKey={true} dataAlign="center" dataSort={true}>Product ID</TableHeaderColumn>
            <TableHeaderColumn theme={styles} dataField="name" dataSort={true}>Product Name</TableHeaderColumn>
            <TableHeaderColumn theme={styles} dataField="price" dataFormat={priceFormatter}>Product Price</TableHeaderColumn>
        </BootstrapTable>
    )
};
Table.styleguide = {
    "category": "Form Components",
    "index": "3.11",
    "wrappedExample": true,
    "example":
        `
// products will be presented by react-bootstrap-table
var products = [{
      id: 1,
      name: "Item name 1",
      price: 100
  },{
      id: 2,
      name: "Item name 2",
      price: 100    
  }];

// internal component methods {
var TableExample = React.createClass({
  render() {
      return (
      <Table data={products} />
      );
    }
// Mount component {
})
ReactDOM.render(<TableExample />, mountNode);
// }
`
    
};

export default Table;
