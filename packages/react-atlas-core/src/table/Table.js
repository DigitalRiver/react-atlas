import React, { Component, PropTypes } from "react";
import cx from 'classNames';
import {BootstrapTable} from "react-bootstrap-table";

class Table extends Component {
    render(){
        const { className, children, styles, ...props } = this.props;
    
        return (
            <BootstrapTable {...props} className={cx(className)}
                            containerClass={styles['react-bs-table-container']}
                            tableContainerClass={styles['react-bs-table']}
                            headerContainerClass={styles['react-bs-container-header']}
                            bodyContainerClass={styles['react-bs-container-body']}>
                {children}
            </BootstrapTable>
        );
    }
}

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
