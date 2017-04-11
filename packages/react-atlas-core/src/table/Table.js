import React, { PropTypes } from "react";
import cx from 'classNames';
import {BootstrapTable} from "react-bootstrap-table";

const Table = ({ className, children, ...props }) => {
  const classes = cx(
    {
      "table": true
    }
  );
    
  return (
      <BootstrapTable {...props} striped={true} hover={true} styleName={classes} className={cx(className)}
                      containerClass={'ra_table__react-bs-table-container'}
                      tableContainerClass={'ra_table__react-bs-table'}
                      headerContainerClass={'ra_table__react-bs-container-header'}
                      bodyContainerClass={'ra_table__react-bs-container-body'}>
          {children}
      </BootstrapTable>
  );
};

Table.propTypes = {
    children: PropTypes.any,
    data: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    pagination: PropTypes.bool,
    options: PropTypes.shape({
        defaultSortName: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
        defaultSortOrder: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ])
    }),
    className: PropTypes.string
};

Table.defaultProps = {
    pagination: true,
    options: {
        defaultSortName: undefined,
        defaultSortOrder: undefined
    }
};

Table.styleguide = {
  "category": "Table",
  "index": "7.1",
  "example": 
    `
const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      name: 'Item name ' + id,
      price: 2100 + i
    });
  }
}

addProducts(70);

const selectRowProp = {
  mode: 'checkbox'
};
// internal component methods {
var TableExample = React.createClass({

  render() {
      this.options = {
        defaultSortName: 'name',  // default sort column name
        defaultSortOrder: 'desc'  // default sort order
    };
    return (
        <Table data={ products } selectRow={ selectRowProp } options={this.options} >
            <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name' dataSort={ true }>Product Name</TableHeaderColumn>
            <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
        </Table>
    );
  }
// Mount component {
})
ReactDOM.render(<TableExample />, mountNode);
// }
`
  
};

export default Table;
