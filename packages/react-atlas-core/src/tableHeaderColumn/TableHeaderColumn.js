import React, { PropTypes } from "react";
import cx from 'classNames';
import { TableHeaderColumn as BTableHeaderColumn } from "react-bootstrap-table";

const TableHeaderColumn = ({ className, children, ...props }) => {
    /*const classes = cx(
        {
            "table-header": true
        }
    );*/
    return (
        <BTableHeaderColumn {...props}>
            {children}
        </BTableHeaderColumn>
    )
};
TableHeaderColumn.propTypes = {
    dataField: PropTypes.string,
    isKey: PropTypes.bool,
    dataSort: PropTypes.bool
};

TableHeaderColumn.defaultProps = {
    isKey: false,
    dataSort: false
};

TableHeaderColumn.styleguide = {
    "category": "Table",
    "index": "7.2",
    "wrappedExample": true,
    "example":
        `
// internal component methods {
var TableHeaderColumnExample = React.createClass({
  render() {
      return (
      <div></div>
      );
    }
// Mount component {
})
ReactDOM.render(<TableHeaderColumnExample />, mountNode);
// }
`
    
};

export default TableHeaderColumn;